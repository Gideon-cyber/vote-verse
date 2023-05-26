// function to see if the user state is empty
export const isEmpty = (obj: Record<string, any>): boolean => {
  return Object.keys(obj).length === 0;
};

export const capitalize = (val: string) => {
  if (!val) return "";
  return `${val[0].toUpperCase()}${val.slice(1).toLowerCase()}`;
};
