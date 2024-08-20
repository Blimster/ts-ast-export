"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const live_plugin_manager_1 = require("live-plugin-manager");
const ts_ast_parser_1 = require("./ts-ast-parser");
const commandDefinitions = [
    { name: 'command', defaultOption: true }
];
const npmDefinitions = [
    { name: 'package', type: String, defaultOption: true },
    { name: 'version', alias: 'v', type: String },
    { name: 'keepSources', alias: 'k', type: Boolean, defaultValue: false }
];
const tsDefinitions = [
    { name: 'root', type: String, defaultOption: true },
    { name: 'tag', alias: 't', type: String },
    { name: 'keepSources', alias: 'k', type: Boolean, defaultValue: false }
];
async function run() {
    const commandLineArgs = require('command-line-args');
    const commandOptions = commandLineArgs(commandDefinitions, { stopAtFirstUnknown: true });
    const argv = commandOptions._unknown || [];
    if (commandOptions.command == "npm") {
        const npmOptions = commandLineArgs(npmDefinitions, { argv });
        const argPackageName = npmOptions.package;
        const argPackageVersion = npmOptions.version;
        const argKeepSources = npmOptions.keepSources;
        const pluginManager = new live_plugin_manager_1.PluginManager();
        const pluginInfo = await pluginManager.install(argPackageName, argPackageVersion);
        let ast = (0, ts_ast_parser_1.parseFromNpm)("plugin_packages/" + pluginInfo.name);
        ast.name = pluginInfo.name;
        ast.version = pluginInfo.version;
        var fileName = (pluginInfo.name + "@" + pluginInfo.version + ".json").replaceAll("/", "_");
        (0, fs_1.writeFileSync)(fileName, JSON.stringify(ast, null, 2));
        if (argKeepSources == false) {
            await pluginManager.uninstall(argPackageName);
            (0, fs_1.rmSync)("plugin_packages", { recursive: true, force: true });
        }
    }
    else if (commandOptions.command == "ts") {
        (0, fs_1.rmSync)("typescript_lib", { recursive: true, force: true });
        const tsOptions = commandLineArgs(tsDefinitions, { argv });
        const argRoot = tsOptions.root;
        const argTag = tsOptions.tag ?? "main";
        const argKeepSources = tsOptions.keepSources;
        let ast = await (0, ts_ast_parser_1.parseFromTypescript)("typescript_lib/", argRoot, argTag);
        var fileName = (argRoot + "@" + argTag + ".json").replaceAll("/", "_");
        (0, fs_1.writeFileSync)(fileName, JSON.stringify(ast, null, 2));
        if (argKeepSources == false) {
            (0, fs_1.rmSync)("typescript_lib", { recursive: true, force: true });
        }
    }
}
run();
