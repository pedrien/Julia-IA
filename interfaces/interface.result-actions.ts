export interface IActionSuccess {
    success: true;
}

export interface IActionError {
    success: false;
    error: string[];
}
