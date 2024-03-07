export const INITIAL_STORAGE_VOLUME = 100;
export const STORAGE_INC_STEP_PERCENTAGE = 20;

export const getStorageValue = (v: number, level: number) =>
    Math.ceil(INITIAL_STORAGE_VOLUME * STORAGE_INC_STEP_PERCENTAGE ** level);
