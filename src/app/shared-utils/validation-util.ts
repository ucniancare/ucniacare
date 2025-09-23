import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Custom validator to check if from time is before to time
 * @returns ValidatorFn that validates time range
 */
export function timeRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const fromTime = control.get('from')?.value;
        const toTime = control.get('to')?.value;
        
        if (!fromTime || !toTime) {
            return null; // Let required validators handle empty values
        }
        
        // Convert to comparable time format
        const fromDate = new Date(fromTime);
        const toDate = new Date(toTime);
        
        // Set the same date for both times to compare only time
        const today = new Date();
        fromDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
        toDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
        
        if (fromDate >= toDate) {
            return { timeRange: true };
        }
        
        return null;
    };
}

/**
 * Custom validator to check if a date is in the future
 * @param control The form control to validate
 * @returns ValidationErrors or null
 */
export function futureDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
        return null; // Let required validators handle empty values
    }
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    if (selectedDate < today) {
        return { pastDate: true };
    }
    
    return null;
}

/**
 * Custom validator to check if a date is not in the past
 * @param control The form control to validate
 * @returns ValidationErrors or null
 */
export function notPastDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
        return null; // Let required validators handle empty values
    }
    
    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day
    
    if (selectedDate < today) {
        return { pastDate: true };
    }
    
    return null;
}
