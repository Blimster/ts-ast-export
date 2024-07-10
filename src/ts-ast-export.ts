import { rmSync, writeFileSync } from "fs";
import { PluginManager } from "live-plugin-manager";
import { parse } from "./ts-ast-parser";

const optionDefinitions = [
    { name: 'package', type: String, defaultOption: true },
    { name: 'version', alias: 'v', type: String },
    { name: 'keepSources', alias: 'k', type: Boolean, defaultValue: false }
]

async function run() {
    const commandLineArgs = require('command-line-args');
    const options = commandLineArgs(optionDefinitions);

    const argPackageName = options.package;
    const argPackageVersion = options.version;
    const argKeepSources = options.keepSources;

    const pluginManager = new PluginManager();
    const pluginInfo = await pluginManager.install(argPackageName, argPackageVersion);

    let ast = parse("plugin_packages/" + pluginInfo.name);
    ast.name = pluginInfo.name;
    ast.version = pluginInfo.version;

    var fileName = (pluginInfo.name + "@" + pluginInfo.version + ".json").replaceAll("/", "_");
    writeFileSync(fileName, JSON.stringify(ast, null, 2));

    if(argKeepSources == false) {
        await pluginManager.uninstall(argPackageName);
        rmSync("plugin_packages", { recursive: true, force: true });
    }
}

run();