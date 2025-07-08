const codamModules = import.meta.glob("./CodamProjects/*.svx", { eager: true });

export const codamProjectMap = Object.fromEntries(
  Object.entries(codamModules).map(([path, codamModule]) => {
    const id = path.split("/").pop()?.replace(".svx", "");
    return [id, codamModule.default];
  })
);

const modules = import.meta.glob("./AboutProjects/*.svx", { eager: true });

export const aboutProjectMap = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => {
    const id = path.split("/").pop()?.replace(".svx", "");
    return [id, module.default];
  })
);
