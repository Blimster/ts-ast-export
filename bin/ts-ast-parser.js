"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseFromNpm = parseFromNpm;
exports.parseFromTypescript = parseFromTypescript;
const fs_1 = require("fs");
const ts_morph_1 = require("ts-morph");
const typescript_1 = require("typescript");
const isAnyKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.AnyKeyword;
const isArrayBindingPattern = (node) => node.getKind() == typescript_1.SyntaxKind.ArrayBindingPattern;
const isArrayType = (node) => node.getKind() == typescript_1.SyntaxKind.ArrayType;
const isBigIntKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.BigIntKeyword;
const isBindingElement = (node) => node.getKind() == typescript_1.SyntaxKind.BindingElement;
const isBooleanKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.BooleanKeyword;
const isCallSignature = (node) => node.getKind() == typescript_1.SyntaxKind.CallSignature;
const isClassDeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.ClassDeclaration;
const isComputedPropertyName = (node) => node.getKind() == typescript_1.SyntaxKind.ComputedPropertyName;
const isConditionalType = (node) => node.getKind() == typescript_1.SyntaxKind.ConditionalType;
const isConstructordeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.Constructor;
const isConstructorType = (node) => node.getKind() == typescript_1.SyntaxKind.ConstructorType;
const isConstructSignature = (node) => node.getKind() == typescript_1.SyntaxKind.ConstructSignature;
const isEnumDeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.EnumDeclaration;
const isEnumMember = (node) => node.getKind() == typescript_1.SyntaxKind.EnumMember;
const isExportDeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.ExportDeclaration;
const isExpressionWithTypeArguments = (node) => node.getKind() == typescript_1.SyntaxKind.ExpressionWithTypeArguments;
const isFalseKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.FalseKeyword;
const isFunctionType = (node) => node.getKind() == typescript_1.SyntaxKind.FunctionType;
const isFunctionDeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.FunctionDeclaration;
const isGetAccessor = (node) => node.getKind() == typescript_1.SyntaxKind.GetAccessor;
const isHeritageClause = (node) => node.getKind() == typescript_1.SyntaxKind.HeritageClause;
const isIdentifier = (node) => node.getKind() == typescript_1.SyntaxKind.Identifier;
const isImportAttribute = (node) => node.getKind() == typescript_1.SyntaxKind.ImportAttribute;
const isImportAttributes = (node) => node.getKind() == typescript_1.SyntaxKind.ImportAttributes;
const isImportClause = (node) => node.getKind() == typescript_1.SyntaxKind.ImportClause;
const isImportDeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.ImportDeclaration;
const isImportSpecifier = (node) => node.getKind() == typescript_1.SyntaxKind.ImportSpecifier;
const isImportType = (node) => node.getKind() == typescript_1.SyntaxKind.ImportType;
const isIndexedAccessType = (node) => node.getKind() == typescript_1.SyntaxKind.IndexedAccessType;
const isIndexSignature = (node) => node.getKind() == typescript_1.SyntaxKind.IndexSignature;
const isInferType = (node) => node.getKind() == typescript_1.SyntaxKind.InferType;
const isInterfaceDeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.InterfaceDeclaration;
const isIntersectionType = (node) => node.getKind() == typescript_1.SyntaxKind.IntersectionType;
const isIntrinsicKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.IntrinsicKeyword;
const isLiteralType = (node) => node.getKind() == typescript_1.SyntaxKind.LiteralType;
const isMappedType = (node) => node.getKind() == typescript_1.SyntaxKind.MappedType;
const isMethodDeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.MethodDeclaration;
const isMethodSignature = (node) => node.getKind() == typescript_1.SyntaxKind.MethodSignature;
const isMinusToken = (node) => node.getKind() == typescript_1.SyntaxKind.MinusToken;
const isModifier = (node) => [typescript_1.SyntaxKind.AbstractKeyword, typescript_1.SyntaxKind.DeclareKeyword, typescript_1.SyntaxKind.ExportKeyword, typescript_1.SyntaxKind.PrivateKeyword, typescript_1.SyntaxKind.ProtectedKeyword, typescript_1.SyntaxKind.ReadonlyKeyword, typescript_1.SyntaxKind.StaticKeyword].includes(node.getKind());
const isModuleBlock = (node) => node.getKind() == typescript_1.SyntaxKind.ModuleBlock;
const isModuleDeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.ModuleDeclaration;
const isNamedImports = (node) => node.getKind() == typescript_1.SyntaxKind.NamedImports;
const isNamespaceExport = (node) => node.getKind() == typescript_1.SyntaxKind.NamespaceExportDeclaration;
const isNamespaceImport = (node) => node.getKind() == typescript_1.SyntaxKind.NamespaceImport;
const isNeverKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.NeverKeyword;
const isNullKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.NullKeyword;
const isNumberKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.NumberKeyword;
const isNumericLiteral = (node) => node.getKind() == typescript_1.SyntaxKind.NumericLiteral;
const isObjectKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.ObjectKeyword;
const isParameter = (node) => node.getKind() == typescript_1.SyntaxKind.Parameter;
const isParenthesizedType = (node) => node.getKind() == typescript_1.SyntaxKind.ParenthesizedType;
const isPrefixUnaryExpression = (node) => node.getKind() == typescript_1.SyntaxKind.PrefixUnaryExpression;
const isPropertyAccessExpression = (node) => node.getKind() == typescript_1.SyntaxKind.PropertyAccessExpression;
const isPropertyDeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.PropertyDeclaration;
const isPropertySignature = (node) => node.getKind() == typescript_1.SyntaxKind.PropertySignature;
const isQualifiedName = (node) => node.getKind() == typescript_1.SyntaxKind.QualifiedName;
const isQuestionToken = (node) => node.getKind() == typescript_1.SyntaxKind.QuestionToken;
const isRestType = (node) => node.getKind() == typescript_1.SyntaxKind.RestType;
const isSetAccessor = (node) => node.getKind() == typescript_1.SyntaxKind.SetAccessor;
const isSourceFile = (node) => node.getKind() == typescript_1.SyntaxKind.SourceFile;
const isStringKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.StringKeyword;
const isStringLiteral = (node) => node.getKind() == typescript_1.SyntaxKind.StringLiteral;
const isSymbolKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.SymbolKeyword;
const isTemplateHead = (node) => node.getKind() == typescript_1.SyntaxKind.TemplateHead;
const isTemplateLiteralType = (node) => node.getKind() == typescript_1.SyntaxKind.TemplateLiteralType;
const isTemplateLiteralTypeSpan = (node) => node.getKind() == typescript_1.SyntaxKind.TemplateLiteralTypeSpan;
const isTemplateMiddle = (node) => node.getKind() == typescript_1.SyntaxKind.TemplateMiddle;
const isTemplateTail = (node) => node.getKind() == typescript_1.SyntaxKind.TemplateTail;
const isThisType = (node) => node.getKind() == typescript_1.SyntaxKind.ThisType;
const isTrueKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.TrueKeyword;
const isTupleType = (node) => node.getKind() == typescript_1.SyntaxKind.TupleType;
const isTypeAliasDeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.TypeAliasDeclaration;
const isTypeLiteral = (node) => node.getKind() == typescript_1.SyntaxKind.TypeLiteral;
const isTypeOperator = (node) => node.getKind() == typescript_1.SyntaxKind.TypeOperator;
const isTypeParameter = (node) => node.getKind() == typescript_1.SyntaxKind.TypeParameter;
const isTypePredicate = (node) => node.getKind() == typescript_1.SyntaxKind.TypePredicate;
const isTypeQuery = (node) => node.getKind() == typescript_1.SyntaxKind.TypeQuery;
const isTypeReference = (node) => node.getKind() == typescript_1.SyntaxKind.TypeReference;
const isUndefinedKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.UndefinedKeyword;
const isUnionType = (node) => node.getKind() == typescript_1.SyntaxKind.UnionType;
const isUnknownKeyword = (node) => node.getKind() == typescript_1.SyntaxKind.UnknownKeyword;
const isVariableDeclaration = (node) => node.getKind() == typescript_1.SyntaxKind.VariableDeclaration;
const isVariableDeclarationList = (node) => node.getKind() == typescript_1.SyntaxKind.VariableDeclarationList;
const isVariableStatement = (node) => node.getKind() == typescript_1.SyntaxKind.VariableStatement;
const isVoidKeyworkd = (node) => node.getKind() == typescript_1.SyntaxKind.VoidKeyword;
const processAnyKeyword = (anyKeyword) => {
    return {
        "kind": anyKeyword.getKindName(),
    };
};
const processArrayBindingPattern = (arrayBindingPattern) => {
    return {
        "kind": arrayBindingPattern.getKindName(),
        "elements": arrayBindingPattern.getElements().map(processNode).filter((node) => node != null),
    };
};
const processArrayType = (arrayType) => {
    return {
        "kind": arrayType.getKindName(),
        "elementType": processNode(arrayType.getElementTypeNode()),
    };
};
const processBooleanKeyword = (booleanKeyword) => {
    return {
        "kind": booleanKeyword.getKindName(),
    };
};
const processBigIntKeyword = (bigIntKeyword) => {
    return {
        "kind": bigIntKeyword.getKindName(),
    };
};
const processBindingElement = (bindingElement) => {
    return {
        "kind": bindingElement.getKindName(),
        "dotDotDotToken": processNode(bindingElement.getDotDotDotToken()),
        "propertyName": processNode(bindingElement.getPropertyNameNode()),
        "name": processNode(bindingElement.getNameNode()),
        "initializer": processNode(bindingElement.getInitializer()),
    };
};
const processCallSignature = (callSignature) => {
    return {
        "kind": callSignature.getKindName(),
        "typeParameters": callSignature.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": callSignature.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(callSignature.getReturnTypeNode()),
    };
};
const processClassDeclaration = (classDeclaration) => {
    return {
        "kind": classDeclaration.getKindName(),
        "modifiers": classDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(classDeclaration.getNameNode()),
        "typeParameters": classDeclaration.getTypeParameters().map(processNode).filter((node) => node != null),
        "heritageClauses": classDeclaration.getHeritageClauses().map(processNode).filter((node) => node != null),
        "members": classDeclaration.getMembers().map(processNode).filter((node) => node != null),
    };
};
const processComputedPropertyName = (computedPropertyName) => {
    return {
        "kind": computedPropertyName.getKindName(),
        "expression": processNode(computedPropertyName.getExpression()),
    };
};
const processConditionalType = (conditionalType) => {
    return {
        "kind": conditionalType.getKindName(),
        "checkType": processNode(conditionalType.getCheckType()),
        "extendsType": processNode(conditionalType.getExtendsType()),
        "trueType": processNode(conditionalType.getTrueType()),
        "falseType": processNode(conditionalType.getFalseType()),
    };
};
const processConstructorDeclaration = (constructor) => {
    return {
        "kind": constructor.getKindName(),
        "typeParameters": constructor.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": constructor.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(constructor.getReturnTypeNode()),
    };
};
const processConstructorType = (constructorType) => {
    return {
        "kind": constructorType.getKindName(),
        "modifiers": constructorType.getModifiers().map(processNode).filter((node) => node != null),
        "typeParameters": constructorType.compilerNode.typeParameters?.map((n) => processNode((0, ts_morph_1.createWrappedNode)(n))).filter((node) => node != null),
        "parameters": constructorType.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(constructorType.getReturnTypeNode()),
    };
};
const processConstructSignature = (constructSignature) => {
    return {
        "kind": constructSignature.getKindName(),
        "typeParameters": constructSignature.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": constructSignature.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(constructSignature.getReturnTypeNode()),
    };
};
const processEnumDeclaration = (enumDeclaration) => {
    return {
        "kind": enumDeclaration.getKindName(),
        "modifiers": enumDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(enumDeclaration.getNameNode()),
        "members": enumDeclaration.getMembers().map(processNode).filter((node) => node != null),
    };
};
const processEnumMember = (enumMember) => {
    return {
        "kind": enumMember.getKindName(),
        "name": processNode(enumMember.getNameNode()),
        "initializer": processNode(enumMember.getInitializer()),
    };
};
const processExpressionWithTypeArguments = (expressionWithTypeArguments) => {
    return {
        "kind": expressionWithTypeArguments.getKindName(),
        "expression": processNode(expressionWithTypeArguments.getExpression()),
        "typeArguments": expressionWithTypeArguments.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};
const processFalseKeyword = (falseKeyword) => {
    return {
        "kind": falseKeyword.getKindName(),
    };
};
const processFunctionDeclaration = (functionDeclaration) => {
    return {
        "kind": functionDeclaration.getKindName(),
        "modifiers": functionDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "asteriskToken": processNode(functionDeclaration.getAsteriskToken()),
        "name": processNode(functionDeclaration.getNameNode()),
        "typeParameters": functionDeclaration.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": functionDeclaration.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(functionDeclaration.getReturnTypeNode())
    };
};
const processFunctionType = (functionType) => {
    return {
        "kind": functionType.getKindName(),
        "typeParameters": functionType.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": functionType.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(functionType.getReturnTypeNode()),
    };
};
const processGetAccessor = (getAccessor) => {
    return {
        "kind": getAccessor.getKindName(),
        "modifiers": getAccessor.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(getAccessor.getNameNode()),
        "typeParameters": getAccessor.getTypeParameters().map(processNode).filter((node) => node != null),
        "type": processNode(getAccessor.getReturnTypeNode()),
    };
};
const processHeritageClause = (heritageClause) => {
    return {
        "kind": heritageClause.getKindName(),
        "token": {
            "kind": heritageClause.getToken() == typescript_1.SyntaxKind.ExtendsKeyword ? "ExtendsKeyword" : "ImplementsKeyword",
        },
        "types": heritageClause.getTypeNodes().map(processNode).filter((node) => node != null),
    };
};
const processIdentifier = (identifier) => {
    return {
        "kind": identifier.getKindName(),
        "text": identifier.getText(),
    };
};
const processImportAttribute = (importAttribute) => {
    return {
        "kind": importAttribute.getKindName(),
        "name": processNode(importAttribute.getNameNode()),
        "value": processNode(importAttribute.getValue()),
    };
};
const processImportAttributes = (importAttributes) => {
    return {
        "kind": importAttributes.getKindName(),
        "elements": importAttributes.getElements().map(processNode).filter((node) => node != null),
    };
};
const processImportClause = (importClause) => {
    return {
        "kind": importClause.getKindName(),
        "isTypeOnly": importClause.compilerNode.isTypeOnly,
        "name": importClause.compilerNode.name ? processNode((0, ts_morph_1.createWrappedNode)(importClause.compilerNode.name)) : undefined,
        "namedBindings": processNode(importClause.getNamedBindings()),
    };
};
const processImportDeclaration = (importDeclaration) => {
    return {
        "kind": importDeclaration.getKindName(),
        "modifiers": importDeclaration.compilerNode.modifiers?.map((n) => processNode((0, ts_morph_1.createWrappedNode)(n))).filter((node) => node != null),
        "importClause": processNode(importDeclaration.getImportClause()),
        "moduleSpecifier": processNode(importDeclaration.getModuleSpecifier()),
        "importAttributes": processNode(importDeclaration.getAttributes()),
    };
};
const processImportSpecifier = (importSpecifier) => {
    return {
        "kind": importSpecifier.getKindName(),
        "isTypeOnly": importSpecifier.compilerNode.isTypeOnly,
        "name": processNode(importSpecifier.getNameNode()),
        "propertyName": importSpecifier.compilerNode.propertyName ? processNode((0, ts_morph_1.createWrappedNode)(importSpecifier.compilerNode.propertyName)) : undefined,
    };
};
const processImportType = (importType) => {
    return {
        "kind": importType.getKindName(),
        "argument": processNode(importType.getArgument()),
        "attributes": processNode(importType.getAttributes()),
        "qualifier": processNode(importType.getQualifier()),
        "typeArguments": importType.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};
const processIndexedAccessType = (indexedAccessType) => {
    return {
        "kind": indexedAccessType.getKindName(),
        "objectType": processNode(indexedAccessType.getObjectTypeNode()),
        "indexType": processNode(indexedAccessType.getIndexTypeNode()),
    };
};
const processIndexSignature = (indexSignature) => {
    return {
        "kind": indexSignature.getKindName(),
        "modifiers": indexSignature.getModifiers().map(processNode).filter((node) => node != null),
        "parameters": indexSignature.compilerNode.parameters.map((p) => processNode((0, ts_morph_1.createWrappedNode)(p))).filter((node) => node != null),
        "type": processNode(indexSignature.getReturnTypeNode()),
    };
};
const processInferType = (inferType) => {
    return {
        "kind": inferType.getKindName(),
        "typeParameter": processNode(inferType.getTypeParameter()),
    };
};
const processInterfaceDeclaration = (interfaceDeclaration) => {
    return {
        "kind": interfaceDeclaration.getKindName(),
        "modifiers": interfaceDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(interfaceDeclaration.getNameNode()),
        "typeParameters": interfaceDeclaration.getTypeParameters().map(processNode).filter((node) => node != null),
        "heritageClauses": interfaceDeclaration.getHeritageClauses().map(processNode).filter((node) => node != null),
        "members": interfaceDeclaration.getMembers().map(processNode).filter((node) => node != null),
    };
};
const processIntersectionType = (intersectionType) => {
    return {
        "kind": intersectionType.getKindName(),
        "types": intersectionType.getTypeNodes().map(processNode).filter((node) => node != null),
    };
};
const processIntrinsicKeyword = (intrinsicKeyword) => {
    return {
        "kind": intrinsicKeyword.getKindName(),
    };
};
const processLiteralType = (literalType) => {
    return {
        "kind": literalType.getKindName(),
        "literal": processNode(literalType.getLiteral()),
    };
};
const processMappedType = (mappedType) => {
    return {
        "kind": mappedType.getKindName(),
        "readonlyToken": processNode(mappedType.getReadonlyToken()),
        "typeParameter": processNode(mappedType.getTypeParameter()),
        "nameType": processNode(mappedType.getNameTypeNode()),
        "questionToken": processNode(mappedType.getQuestionToken()),
        "type": processNode(mappedType.getTypeNode()),
        "members": mappedType.compilerNode.members?.map((n) => processNode((0, ts_morph_1.createWrappedNode)(n))).filter((node) => node != null),
    };
};
const processMethodDeclaration = (methodDeclaration) => {
    return {
        "kind": methodDeclaration.getKindName(),
        "modifiers": methodDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(methodDeclaration.getNameNode()),
        "asteriskToken": processNode(methodDeclaration.getAsteriskToken()),
        "questionToken": processNode(methodDeclaration.getQuestionTokenNode()),
        "typeParameters": methodDeclaration.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": methodDeclaration.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(methodDeclaration.getReturnTypeNode())
    };
};
const processMethodSignature = (methodSignature) => {
    return {
        "kind": methodSignature.getKindName(),
        "name": processNode(methodSignature.getNameNode()),
        "questionToken": processNode(methodSignature.getQuestionTokenNode()),
        "typeParameters": methodSignature.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": methodSignature.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(methodSignature.getReturnTypeNode())
    };
};
const processMinusToken = (minusToken) => {
    return {
        "kind": minusToken.getKindName(),
    };
};
const processModifier = (modifier) => {
    return {
        "kind": modifier.getKindName(),
    };
};
const processModuleBlock = (moduleBlock) => {
    return {
        "kind": moduleBlock.getKindName(),
        "statements": moduleBlock.getStatements().map(processNode).filter((node) => node != null),
    };
};
const processModuleDeclaration = (moduleDeclaration) => {
    return {
        "kind": moduleDeclaration.getKindName(),
        "modifiers": moduleDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(moduleDeclaration.getNameNode()),
        "body": processNode(moduleDeclaration.getBody()),
    };
};
const processNamedImports = (namedImports) => {
    return {
        "kind": namedImports.getKindName(),
        "elements": namedImports.getElements().map(processNode).filter((node) => node != null),
    };
};
const processNamespaceImport = (namespaceImport) => {
    return {
        "kind": namespaceImport.getKindName(),
        "name": processNode(namespaceImport.getNameNode()),
    };
};
const processNeverKeyword = (neverKeyword) => {
    return {
        "kind": neverKeyword.getKindName(),
    };
};
const processNullKeyword = (nullKeyword) => {
    return {
        "kind": nullKeyword.getKindName(),
    };
};
const processNumberKeyword = (numberKeyword) => {
    return {
        "kind": numberKeyword.getKindName(),
    };
};
const processNumericLiteral = (numericLiteral) => {
    return {
        "kind": numericLiteral.getKindName(),
        "text": numericLiteral.getText(),
    };
};
const processObjectKeyword = (objectKeyword) => {
    return {
        "kind": objectKeyword.getKindName(),
    };
};
const processParameter = (parameter) => {
    return {
        "kind": parameter.getKindName(),
        "modifiers": parameter.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(parameter.getNameNode()),
        "questionToken": processNode(parameter.getQuestionTokenNode()),
        "type": processNode(parameter.getTypeNode()),
        "initializer": processNode(parameter.getInitializer()),
    };
};
const processParenthesizedType = (parenthesizedType) => {
    return {
        "kind": parenthesizedType.getKindName(),
        "type": processNode(parenthesizedType.getTypeNode()),
    };
};
const processPrefixUnaryExpression = (prefixUnaryExpression) => {
    return {
        "kind": prefixUnaryExpression.getKindName(),
        "operator": {
            "kind": typescript_1.SyntaxKind[prefixUnaryExpression.getOperatorToken().toString()]
        },
        "operand": processNode(prefixUnaryExpression.getOperand()),
    };
};
const processPropertyAccessExpression = (propertyAccessExpression) => {
    return {
        "kind": propertyAccessExpression.getKindName(),
        "expression": processNode(propertyAccessExpression.getExpression()),
        "questionDotToken": processNode(propertyAccessExpression.getQuestionDotTokenNode()),
        "name": processNode(propertyAccessExpression.getNameNode()),
    };
};
const processPropertyDeclaration = (propertyDeclaration) => {
    return {
        "kind": propertyDeclaration.getKindName(),
        "modifiers": propertyDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(propertyDeclaration.getNameNode()),
        "questionToken": processNode(propertyDeclaration.getQuestionTokenNode()),
        "exclamationToken": processNode(propertyDeclaration.getExclamationTokenNode()),
        "type": processNode(propertyDeclaration.getTypeNode()),
        "initializer": processNode(propertyDeclaration.getInitializer()),
    };
};
const processPropertySignature = (propertySignature) => {
    return {
        "kind": propertySignature.getKindName(),
        "modifiers": propertySignature.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(propertySignature.getNameNode()),
        "questionToken": processNode(propertySignature.getQuestionTokenNode()),
        "type": processNode(propertySignature.getTypeNode()),
        "initializer": processNode(propertySignature.getInitializer()),
    };
};
const processQualifiedName = (qualifiedName) => {
    return {
        "kind": qualifiedName.getKindName(),
        "left": processNode(qualifiedName.getLeft()),
        "right": processNode(qualifiedName.getRight()),
    };
};
const processQuestionToken = (questionToken) => {
    return {
        "kind": questionToken.getKindName(),
    };
};
const processRestType = (restType) => {
    return {
        "kind": restType.getKindName(),
        "type": processNode(restType.getTypeNode()),
    };
};
const processSetAccessor = (setAccessor) => {
    return {
        "kind": setAccessor.getKindName(),
        "modifiers": setAccessor.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(setAccessor.getNameNode()),
        "typeParameters": setAccessor.getTypeParameters().map(processNode).filter((node) => node != null),
        "type": processNode(setAccessor.getReturnTypeNode()),
    };
};
const processSourceFile = (sourceFile) => {
    return {
        "kind": sourceFile.getKindName(),
        "baseName": sourceFile.getBaseName(),
        "statements": sourceFile.getStatements().map(processNode).filter((node) => node != null)
    };
};
const processStringKeyword = (stringKeyword) => {
    return {
        "kind": stringKeyword.getKindName(),
    };
};
const processStringLiteral = (stringLiteral) => {
    return {
        "kind": stringLiteral.getKindName(),
        "text": stringLiteral.getText(),
    };
};
const processSymbolKeyword = (symbolKeyword) => {
    return {
        "kind": symbolKeyword.getKindName(),
    };
};
const processTemplateHead = (templateHead) => {
    return {
        "kind": templateHead.getKindName(),
        "text": templateHead.getText(),
    };
};
const processTemplateLiteralType = (templateLiteralType) => {
    return {
        "kind": templateLiteralType.getKindName(),
        "head": processNode(templateLiteralType.getHead()),
        "templateSpans": templateLiteralType.getTemplateSpans().map(processNode).filter((node) => node != null),
    };
};
const processTemplateLiteralTypeSpan = (templateLiteralTypeSpan) => {
    const compilerNode = templateLiteralTypeSpan.compilerNode;
    return {
        "kind": templateLiteralTypeSpan.getKindName(),
        "type": processNode((0, ts_morph_1.createWrappedNode)(compilerNode.type)),
        "literal": processNode((0, ts_morph_1.createWrappedNode)(compilerNode.literal)),
    };
};
const processTemplateMiddle = (templateTail) => {
    return {
        "kind": templateTail.getKindName(),
        "text": templateTail.getText(),
    };
};
const processTemplateTail = (templateTail) => {
    return {
        "kind": templateTail.getKindName(),
        "text": templateTail.getText(),
    };
};
const processThisType = (thisType) => {
    return {
        "kind": thisType.getKindName(),
    };
};
const processTrueKeyword = (trueKeyword) => {
    return {
        "kind": trueKeyword.getKindName(),
    };
};
const processTupleType = (tupleType) => {
    return {
        "kind": tupleType.getKindName(),
        "elements": tupleType.getElements().map(processNode).filter((node) => node != null),
    };
};
const processTypeAliasDeclaration = (typeAliasDeclaration) => {
    return {
        "kind": typeAliasDeclaration.getKindName(),
        "modifiers": typeAliasDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(typeAliasDeclaration.getNameNode()),
        "typeParameters": typeAliasDeclaration.getTypeParameters().map(processNode).filter((node) => node != null),
        "type": processNode(typeAliasDeclaration.getTypeNode()),
    };
};
const processTypeLiteral = (typeLiteral) => {
    return {
        "kind": typeLiteral.getKindName(),
        "members": typeLiteral.getMembers().map(processNode).filter((node) => node != null),
    };
};
const processTypeOperator = (typeOperator) => {
    return {
        "kind": typeOperator.getKindName(),
        "operator": {
            "kind": typescript_1.SyntaxKind[typeOperator.getOperator().toString()]
        },
        "type": processNode(typeOperator.getTypeNode()),
    };
};
const processTypeParameter = (typeParameter) => {
    return {
        "kind": typeParameter.getKindName(),
        "modifiers": typeParameter.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(typeParameter.getNameNode()),
        "constraint": processNode(typeParameter.getConstraint()),
        "default": processNode(typeParameter.getDefault()),
    };
};
const processTypePredicate = (typePredicate) => {
    return {
        "kind": typePredicate.getKindName(),
        "assertsModifier": processNode(typePredicate.getAssertsModifier()),
        "parameterName": processNode(typePredicate.getParameterNameNode()),
        "type": processNode(typePredicate.getTypeNode()),
    };
};
const processTypeQuery = (typeQuery) => {
    return {
        "kind": typeQuery.getKindName(),
        "exprName": processNode(typeQuery.getExprName()),
        "typeArguments": typeQuery.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};
const processTypeReference = (typeReference) => {
    return {
        "kind": typeReference.getKindName(),
        "typeName": processNode(typeReference.getTypeName()),
        "typeArguments": typeReference.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};
const processUndefinedKeyword = (undefinedKeyword) => {
    return {
        "kind": undefinedKeyword.getKindName(),
    };
};
const processUnionType = (unionType) => {
    return {
        "kind": unionType.getKindName(),
        "types": unionType.getTypeNodes().map(processNode).filter((node) => node != null),
    };
};
const processUnknownKeyword = (unknownKeyword) => {
    return {
        "kind": unknownKeyword.getKindName(),
    };
};
const processVariableDeclaration = (variableDeclaration) => {
    return {
        "kind": variableDeclaration.getKindName(),
        "name": processNode(variableDeclaration.getNameNode()),
        "exclamationToken": processNode(variableDeclaration.getExclamationTokenNode()),
        "type": processNode(variableDeclaration.getTypeNode()),
        "initializer": processNode(variableDeclaration.getInitializer()),
    };
};
const processVariableDeclarationList = (variableDeclarationList) => {
    return {
        "kind": variableDeclarationList.getKindName(),
        "declarations": variableDeclarationList.getDeclarations().map(processNode).filter((node) => node != null),
    };
};
const processVariableStatement = (variableStatement) => {
    return {
        "kind": variableStatement.getKindName(),
        "modifiers": variableStatement.getModifiers().map(processNode).filter((node) => node != null),
        "declarationList": processNode(variableStatement.getDeclarationList()),
    };
};
const processVoidKeyword = (voidKeyword) => {
    return {
        "kind": voidKeyword.getKindName(),
    };
};
const processNode = (node) => {
    if (node == undefined || node == null) {
        return null;
    }
    else if (isAnyKeyword(node)) {
        return processAnyKeyword(node);
    }
    else if (isArrayBindingPattern(node)) {
        return processArrayBindingPattern(node);
    }
    else if (isArrayType(node)) {
        return processArrayType(node);
    }
    else if (isBooleanKeyword(node)) {
        return processBooleanKeyword(node);
    }
    else if (isBigIntKeyword(node)) {
        return processBigIntKeyword(node);
    }
    else if (isBindingElement(node)) {
        return processBindingElement(node);
    }
    else if (isCallSignature(node)) {
        return processCallSignature(node);
    }
    else if (isClassDeclaration(node)) {
        return processClassDeclaration(node);
    }
    else if (isComputedPropertyName(node)) {
        return processComputedPropertyName(node);
    }
    else if (isConditionalType(node)) {
        return processConditionalType(node);
    }
    else if (isConstructordeclaration(node)) {
        return processConstructorDeclaration(node);
    }
    else if (isConstructorType(node)) {
        return processConstructorType(node);
    }
    else if (isConstructSignature(node)) {
        return processConstructSignature(node);
    }
    else if (isEnumDeclaration(node)) {
        return processEnumDeclaration(node);
    }
    else if (isEnumMember(node)) {
        return processEnumMember(node);
    }
    else if (isExportDeclaration(node)) {
        return null;
    }
    else if (isExpressionWithTypeArguments(node)) {
        return processExpressionWithTypeArguments(node);
    }
    else if (isFalseKeyword(node)) {
        return processFalseKeyword(node);
    }
    else if (isFunctionDeclaration(node)) {
        return processFunctionDeclaration(node);
    }
    else if (isFunctionType(node)) {
        return processFunctionType(node);
    }
    else if (isGetAccessor(node)) {
        return processGetAccessor(node);
    }
    else if (isHeritageClause(node)) {
        return processHeritageClause(node);
    }
    else if (isIdentifier(node)) {
        return processIdentifier(node);
    }
    else if (isImportAttribute(node)) {
        return processImportAttribute(node);
    }
    else if (isImportAttributes(node)) {
        return processImportAttributes(node);
    }
    else if (isImportClause(node)) {
        return processImportClause(node);
    }
    else if (isImportDeclaration(node)) {
        return processImportDeclaration(node);
    }
    else if (isImportSpecifier(node)) {
        return processImportSpecifier(node);
    }
    else if (isImportType(node)) {
        return processImportType(node);
    }
    else if (isIndexedAccessType(node)) {
        return processIndexedAccessType(node);
    }
    else if (isIndexSignature(node)) {
        return processIndexSignature(node);
    }
    else if (isInferType(node)) {
        return processInferType(node);
    }
    else if (isInterfaceDeclaration(node)) {
        return processInterfaceDeclaration(node);
    }
    else if (isIntersectionType(node)) {
        return processIntersectionType(node);
    }
    else if (isIntrinsicKeyword(node)) {
        return processIntrinsicKeyword(node);
    }
    else if (isLiteralType(node)) {
        return processLiteralType(node);
    }
    else if (isMappedType(node)) {
        return processMappedType(node);
    }
    else if (isMethodDeclaration(node)) {
        return processMethodDeclaration(node);
    }
    else if (isMethodSignature(node)) {
        return processMethodSignature(node);
    }
    else if (isMinusToken(node)) {
        return processMinusToken(node);
    }
    else if (isModifier(node)) {
        return processModifier(node);
    }
    else if (isModuleBlock(node)) {
        return processModuleBlock(node);
    }
    else if (isModuleDeclaration(node)) {
        return processModuleDeclaration(node);
    }
    else if (isNamedImports(node)) {
        return processNamedImports(node);
    }
    else if (isNamespaceImport(node)) {
        return processNamespaceImport(node);
    }
    else if (isNamespaceExport(node)) {
        return null;
    }
    else if (isNeverKeyword(node)) {
        return processNeverKeyword(node);
    }
    else if (isNullKeyword(node)) {
        return processNullKeyword(node);
    }
    else if (isNumberKeyword(node)) {
        return processNumberKeyword(node);
    }
    else if (isNumericLiteral(node)) {
        return processNumericLiteral(node);
    }
    else if (isObjectKeyword(node)) {
        return processObjectKeyword(node);
    }
    else if (isParameter(node)) {
        return processParameter(node);
    }
    else if (isParenthesizedType(node)) {
        return processParenthesizedType(node);
    }
    else if (isPrefixUnaryExpression(node)) {
        return processPrefixUnaryExpression(node);
    }
    else if (isPropertyAccessExpression(node)) {
        return processPropertyAccessExpression(node);
    }
    else if (isPropertyDeclaration(node)) {
        return processPropertyDeclaration(node);
    }
    else if (isPropertySignature(node)) {
        return processPropertySignature(node);
    }
    else if (isQualifiedName(node)) {
        return processQualifiedName(node);
    }
    else if (isQuestionToken(node)) {
        return processQuestionToken(node);
    }
    else if (isRestType(node)) {
        return processRestType(node);
    }
    else if (isSetAccessor(node)) {
        return processSetAccessor(node);
    }
    else if (isSourceFile(node)) {
        return processSourceFile(node);
    }
    else if (isStringKeyword(node)) {
        return processStringKeyword(node);
    }
    else if (isStringLiteral(node)) {
        return processStringLiteral(node);
    }
    else if (isSymbolKeyword(node)) {
        return processSymbolKeyword(node);
    }
    else if (isTemplateHead(node)) {
        return processTemplateHead(node);
    }
    else if (isTemplateLiteralType(node)) {
        return processTemplateLiteralType(node);
    }
    else if (isTemplateLiteralTypeSpan(node)) {
        return processTemplateLiteralTypeSpan(node);
    }
    else if (isTemplateMiddle(node)) {
        return processTemplateMiddle(node);
    }
    else if (isTemplateTail(node)) {
        return processTemplateTail(node);
    }
    else if (isThisType(node)) {
        return processThisType(node);
    }
    else if (isTrueKeyword(node)) {
        return processTrueKeyword(node);
    }
    else if (isTupleType(node)) {
        return processTupleType(node);
    }
    else if (isTypeAliasDeclaration(node)) {
        return processTypeAliasDeclaration(node);
    }
    else if (isTypeLiteral(node)) {
        return processTypeLiteral(node);
    }
    else if (isTypeOperator(node)) {
        return processTypeOperator(node);
    }
    else if (isTypeParameter(node)) {
        return processTypeParameter(node);
    }
    else if (isTypePredicate(node)) {
        return processTypePredicate(node);
    }
    else if (isTypeQuery(node)) {
        return processTypeQuery(node);
    }
    else if (isTypeReference(node)) {
        return processTypeReference(node);
    }
    else if (isUndefinedKeyword(node)) {
        return processUndefinedKeyword(node);
    }
    else if (isUnionType(node)) {
        return processUnionType(node);
    }
    else if (isUnknownKeyword(node)) {
        return processUnknownKeyword(node);
    }
    else if (isVariableDeclaration(node)) {
        return processVariableDeclaration(node);
    }
    else if (isVariableDeclarationList(node)) {
        return processVariableDeclarationList(node);
    }
    else if (isVariableStatement(node)) {
        return processVariableStatement(node);
    }
    else if (isVoidKeyworkd(node)) {
        return processVoidKeyword(node);
    }
    else {
        console.log("WARNING: unsupported syntax kind: " + node.getKindName() + " (" + node.getSourceFile().getBaseName() + ")");
    }
};
function parseFromNpm(directory) {
    const project = new ts_morph_1.Project({
        compilerOptions: {
            target: ts_morph_1.ScriptTarget.ESNext,
        },
        skipAddingFilesFromTsConfig: true
    });
    const packageJson = JSON.parse((0, fs_1.readFileSync)(directory + "/package.json").toString());
    const typesFile = packageJson.types;
    //project.addSourceFilesAtPaths(directory + "/**/*.d.ts");
    project.addSourceFilesAtPaths(directory + "/" + typesFile);
    const sourceFiles = [];
    project.getSourceFiles().forEach((sourceFile) => {
        const processedSourceFile = processSourceFile(sourceFile);
        sourceFiles.push({
            "kind": processedSourceFile.kind,
            "path": sourceFile.getFilePath().substring(sourceFile.getFilePath().indexOf(directory) + directory.length, sourceFile.getFilePath().length - sourceFile.getBaseName().length),
            "baseName": processedSourceFile.baseName,
            "statements": processedSourceFile.statements
        });
    });
    return {
        "name": "",
        "version": "",
        "sourceFiles": sourceFiles
    };
}
async function httpDownload(directory, root, tag) {
    const filename = directory + root + ".d.ts";
    const response = await fetch("https://raw.githubusercontent.com/microsoft/TypeScript/" + tag + "/src/lib/" + root + ".d.ts");
    const content = await response.text();
    (0, fs_1.writeFileSync)(directory + root + ".d.ts", content);
    const matches = content.matchAll(/\/\/\/ <reference lib="(.*)" \/>/g);
    for (const match of matches) {
        await httpDownload(directory, match[1], tag);
    }
}
async function parseFromTypescript(directory, root, tag) {
    if (!(0, fs_1.existsSync)(directory)) {
        (0, fs_1.mkdirSync)(directory);
    }
    await httpDownload(directory, root, tag);
    const project = new ts_morph_1.Project({
        compilerOptions: {
            target: ts_morph_1.ScriptTarget.ESNext,
        },
        skipAddingFilesFromTsConfig: true
    });
    project.addSourceFilesAtPaths(directory + "**/*.d.ts");
    const sourceFiles = [];
    project.getSourceFiles().forEach((sourceFile) => {
        const processedSourceFile = processSourceFile(sourceFile);
        sourceFiles.push({
            "kind": processedSourceFile.kind,
            "path": sourceFile.getFilePath().substring(sourceFile.getFilePath().indexOf(directory) + directory.length, sourceFile.getFilePath().length - sourceFile.getBaseName().length),
            "baseName": processedSourceFile.baseName,
            "statements": processedSourceFile.statements
        });
    });
    return {
        "name": root,
        "version": tag,
        "sourceFiles": sourceFiles
    };
}
