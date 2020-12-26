export const today = () => new Date().toISOString().slice(0, 16);

export const tomorrow = () => new Date(Date.now() + 86400 * 1000).toISOString().slice(0, 16);

export const yesterday = () => new Date(Date.now() - 86400 * 1000).toISOString().slice(0, 16);