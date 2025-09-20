import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { from, map, Observable, switchMap, tap } from "rxjs";
import { UserService } from "./user.service";
import { UserAccount } from "../shared-interfaces/user-account";
import { FirebaseService } from "./firebase.service";
import { COLLECTION } from "../constants/firebase-collection.constants";
import { GoogleToken } from "../shared-interfaces/google-token";
import { SpinnerOverlayService } from "./primeng-services/spinner-overlay.service";

@Injectable(
    { providedIn: 'root' }
)


export class FileUploadService {

    private ucniacareMasterFolderId: string = '1-nv0EWpveoaznRDk5KLS49fR3IKtdfge';
    private currentUser: UserAccount | null = null;

    constructor(
        private http: HttpClient,
        private userService: UserService,
        private firebaseService: FirebaseService,
        private spinnerOverlayService: SpinnerOverlayService
    ) {
        this.currentUser = this.userService.currentUserAccount();
    }


    public uploadFile(file: File, folder?: string, clearExistingFiles: boolean = false): Observable<any> {

        this.spinnerOverlayService.show('Uploading file...');

        return this.getAccessToken().pipe(
            switchMap(accessToken => 
                this.getOrCreateUserFolder(accessToken).pipe(
                    switchMap(userFolderId => {
                        // If folder parameter is provided, create/get subfolder, otherwise use user folder directly
                        if (folder) {
                            return this.getOrCreateSubFolder(accessToken, userFolderId, folder);
                        } 
                        else {
                            return from(Promise.resolve(userFolderId));
                        }
                    }),
                    switchMap(targetFolderId => {

                        if (clearExistingFiles) {
                            return this.clearFolder(accessToken, targetFolderId).pipe(
                                switchMap(() => this.uploadToFolder(accessToken, file, targetFolderId))
                            );
                        } else {
                            return this.uploadToFolder(accessToken, file, targetFolderId);
                        }

                        /*const metadata = {
                            name: file.name,
                            mimeType: file.type,
                            parents: [targetFolderId] 
                        };

                        const form = new FormData();
                        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
                        form.append('file', file);

                        return this.http.post<any>(
                            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
                            form,
                            { headers: { Authorization: `Bearer ${accessToken}` } }
                        ).pipe(
                            switchMap(fileRes =>
                                this.http.post(
                                    `https://www.googleapis.com/drive/v3/files/${fileRes.id}/permissions`,
                                    { role: 'reader', type: 'anyone' },
                                    {
                                        headers: {
                                            Authorization: `Bearer ${accessToken}`,
                                            'Content-Type': 'application/json'
                                        }
                                    }
                                ).pipe(
                                    map(() => {
                                        this.spinnerOverlayService.hide();
                                        return fileRes;
                                    })
                                )
                            )
                        );*/
                    })
                )
            ),
            tap({
                error: () => this.spinnerOverlayService.hide()
            })
        );
    }

    private uploadToFolder(accessToken: string, file: File, targetFolderId: string): Observable<any> {
        const metadata = {
            name: file.name,
            mimeType: file.type,
            parents: [targetFolderId]
        };
    
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', file);
    
        return this.http.post<any>(
            'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
            form,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ).pipe(
            switchMap(fileRes =>
                this.http.post(
                    `https://www.googleapis.com/drive/v3/files/${fileRes.id}/permissions`,
                    { role: 'reader', type: 'anyone' },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        }
                    }
                ).pipe(
                    map(() => {
                        this.spinnerOverlayService.hide();
                        return fileRes;
                    })
                )
            )
        );
    }

    private clearFolder(accessToken: string, folderId: string): Observable<void> {
        return this.http.get<any>(
            `https://www.googleapis.com/drive/v3/files?q='${folderId}' in parents and trashed=false`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ).pipe(
            switchMap(res => {
                if (!res.files || res.files.length === 0) {
                    return from(Promise.resolve()); // nothing to delete
                }
    
                // delete all files in parallel
                const deleteRequests = res.files.map((file: any) =>
                    this.http.delete<void>(
                        `https://www.googleapis.com/drive/v3/files/${file.id}`,
                        { headers: { Authorization: `Bearer ${accessToken}` } }
                    )
                );
    
                return from(Promise.all(deleteRequests)).pipe(map(() => {}));
            })
        );
    }    
    

    private getAccessToken(): Observable<string> {
        return this.firebaseService.getAllData$<GoogleToken>(COLLECTION.GOOGLE_TOKEN.COLLECTIONNAME).pipe(
            map((tokens: (GoogleToken & { id: string; })[]) => {
                if (tokens && tokens.length > 0) {
                    return tokens[0].accessToken || '';
                }
                throw new Error('No Google access token found. Please generate a new token.');
            })
        );
    }

    private getOrCreateUserFolder(accessToken: string): Observable<string> {
        return this.http.get<any>(
            `https://www.googleapis.com/drive/v3/files?q=name='${this.currentUser?.id}' and '${this.ucniacareMasterFolderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ).pipe(
            switchMap(res => {
                if (res.files.length > 0) {
                    return from(Promise.resolve(res.files[0].id));
                } else {
                    const metadata = {
                        name: this.currentUser?.id,
                        mimeType: 'application/vnd.google-apps.folder',
                        parents: [this.ucniacareMasterFolderId]
                    };

                    return this.http.post<any>(
                        'https://www.googleapis.com/drive/v3/files',
                        metadata,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    ).pipe(
                        switchMap(folder => from(Promise.resolve(folder.id)))
                    );
                }
            })
        );
    }

    private getOrCreateSubFolder(accessToken: string, parentFolderId: string, folderName: string): Observable<string> {
        // Handle nested folder paths (e.g., "documents/medical/reports")
        const folderParts = folderName.split('/').filter(part => part.trim() !== '');
        
        return this.createNestedFolders(accessToken, parentFolderId, folderParts);
    }

    private createNestedFolders(accessToken: string, currentParentId: string, folderParts: string[]): Observable<string> {
        if (folderParts.length === 0) {
            return from(Promise.resolve(currentParentId));
        }

        const currentFolderName = folderParts[0];
        const remainingParts = folderParts.slice(1);

        return this.http.get<any>(
            `https://www.googleapis.com/drive/v3/files?q=name='${currentFolderName}' and '${currentParentId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        ).pipe(
            switchMap(res => {
                let folderId: string;
                
                if (res.files.length > 0) {
                    // Folder exists, use its ID
                    folderId = res.files[0].id;
                    return from(Promise.resolve(folderId));
                } else {
                    // Create the folder
                    const metadata = {
                        name: currentFolderName,
                        mimeType: 'application/vnd.google-apps.folder',
                        parents: [currentParentId]
                    };

                    return this.http.post<any>(
                        'https://www.googleapis.com/drive/v3/files',
                        metadata,
                        {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-Type': 'application/json'
                            }
                        }
                    ).pipe(
                        map(folder => folder.id)
                    );
                }
            }),
            switchMap(folderId => {
                // Recursively create remaining folders
                return this.createNestedFolders(accessToken, folderId, remainingParts);
            })
        );
    }


}