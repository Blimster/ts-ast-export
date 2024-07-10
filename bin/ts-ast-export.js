"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const live_plugin_manager_1 = require("live-plugin-manager");
const ts_ast_parser_1 = require("./ts-ast-parser");
async function run() {
    const args = process.argv.slice(2);
    const argPackageName = args[0];
    const argPackageVersion = args[1];
    const pluginManager = new live_plugin_manager_1.PluginManager();
    const pluginInfo = await pluginManager.install(argPackageName, argPackageVersion);
    let ast = (0, ts_ast_parser_1.parse)("plugin_packages/" + pluginInfo.name);
    ast.name = pluginInfo.name;
    ast.version = pluginInfo.version;
    var fileName = (pluginInfo.name + "@" + pluginInfo.version + ".json").replaceAll("/", "_");
    (0, fs_1.writeFileSync)(fileName, JSON.stringify(ast, null, 2));
    await pluginManager.uninstall(argPackageName);
    (0, fs_1.rmSync)("plugin_packages", { recursive: true, force: true });
}
run();
