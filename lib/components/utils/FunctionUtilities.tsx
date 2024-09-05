export const isPlaceholderSettingsValue = (key:string) => {
    return !key || key == '' || key.charAt(0) == '<';
}

export const talkyDelay = async (delay:number) => {
    await new Promise(resolve => setTimeout(resolve, delay));
}