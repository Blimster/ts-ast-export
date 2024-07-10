import { rmSync, writeFileSync } from "fs";
import { PluginManager } from "live-plugin-manager";
import { parse } from "./ts-ast-parser";


async function run() {
    const args = process.argv.slice(2);
    const argPackageName = args[0];
    const argPackageVersion = args[1];
    
    const pluginManager = new PluginManager();
    const pluginInfo = await pluginManager.install(argPackageName, argPackageVersion);

    let ast = parse("plugin_packages/" + pluginInfo.name);
    ast.name = pluginInfo.name;
    ast.version = pluginInfo.version;

    var fileName = (pluginInfo.name + "@" + pluginInfo.version + ".json").replaceAll("/", "_");
    writeFileSync(fileName, JSON.stringify(ast, null, 2));

    await pluginManager.uninstall(argPackageName);

    rmSync("plugin_packages", { recursive: true, force: true });
}

run();