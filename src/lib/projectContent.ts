const modules = import.meta.glob("./CodamProjects/*.svx", { eager: true });

export const projectMap = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => {
    const id = path.split("/").pop()?.replace(".svx", "");
    return [id, module.default];
  })
);
