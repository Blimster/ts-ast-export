import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { ArrayBindingPattern, ArrayTypeNode, BindingElement, CallSignatureDeclaration, ClassDeclaration, ComputedPropertyName, ConditionalTypeNode, ConstructorDeclaration, ConstructorTypeNode, ConstructSignatureDeclaration, createWrappedNode, EnumDeclaration, EnumMember, ExportDeclaration, ExpressionWithTypeArguments, FunctionDeclaration, FunctionTypeNode, GetAccessorDeclaration, HeritageClause, Identifier, ImportAttribute, ImportAttributes, ImportClause, ImportDeclaration, ImportSpecifier, ImportTypeNode, IndexedAccessTypeNode, IndexSignatureDeclaration, InferTypeNode, InterfaceDeclaration, IntersectionTypeNode, LiteralTypeNode, MappedTypeNode, MethodDeclaration, MethodSignature, ModuleBlock, ModuleDeclaration, NamedImports, NamedTupleMember, NamespaceExport, NamespaceImport, Node, NumericLiteral, OptionalTypeNode, ParameterDeclaration, ParenthesizedTypeNode, PrefixUnaryExpression, Project, PropertyAccessExpression, PropertyDeclaration, PropertySignature, QualifiedName, RestTypeNode, ScriptTarget, SetAccessorDeclaration, SourceFile, TemplateHead, TemplateLiteralTypeNode, TemplateMiddle, TemplateTail, ThisTypeNode, TupleTypeNode, TypeAliasDeclaration, TypeLiteralNode, TypeOperatorTypeNode, TypeParameterDeclaration, TypePredicateNode, TypeQueryNode, TypeReferenceNode, UnionTypeNode, VariableDeclaration, VariableDeclarationList, VariableStatement } from "ts-morph";
import { NodeFlags, SyntaxKind, TemplateLiteralTypeSpan } from "typescript";

const getFlagNames = (flags: number, enumObject: Record<string, string | number>, excludeMask: number = 0): string[] => {
    const filteredFlags = flags & ~excludeMask;

    if (filteredFlags == 0) {
        const zeroName = enumObject[0];
        return typeof zeroName == "string" && zeroName != "None" ? [zeroName] : [];
    }

    const names: string[] = [];

    for (const [name, value] of Object.entries(enumObject)) {
        if (typeof value != "number") {
            continue;
        }

        if (value <= 0 || !Number.isInteger(Math.log2(value))) {
            continue;
        }

        if ((filteredFlags & value) == value) {
            if (name != "None") {
                names.push(name);
            }
        }
    }

    return names;
};

const isAnyKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.AnyKeyword;
const isArrayBindingPattern = (node: Node): node is ArrayBindingPattern => node.getKind() == SyntaxKind.ArrayBindingPattern;
const isArrayType = (node: Node): node is ArrayTypeNode => node.getKind() == SyntaxKind.ArrayType;
const isBigIntKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.BigIntKeyword;
const isBindingElement = (node: Node): node is BindingElement => node.getKind() == SyntaxKind.BindingElement;
const isBooleanKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.BooleanKeyword;
const isCallSignature = (node: Node): node is CallSignatureDeclaration => node.getKind() == SyntaxKind.CallSignature;
const isClassDeclaration = (node: Node): node is ClassDeclaration => node.getKind() == SyntaxKind.ClassDeclaration;
const isComputedPropertyName = (node: Node): node is ComputedPropertyName => node.getKind() == SyntaxKind.ComputedPropertyName;
const isConditionalType = (node: Node): node is ConditionalTypeNode => node.getKind() == SyntaxKind.ConditionalType;
const isConstructordeclaration = (node: Node): node is ConstructorDeclaration => node.getKind() == SyntaxKind.Constructor;
const isConstructorType = (node: Node): node is ConstructorTypeNode => node.getKind() == SyntaxKind.ConstructorType;
const isConstructSignature = (node: Node): node is ConstructSignatureDeclaration => node.getKind() == SyntaxKind.ConstructSignature;
const isEnumDeclaration = (node: Node): node is EnumDeclaration => node.getKind() == SyntaxKind.EnumDeclaration;
const isEnumMember = (node: Node): node is EnumMember => node.getKind() == SyntaxKind.EnumMember;
const isExportDeclaration = (node: Node): node is ExportDeclaration => node.getKind() == SyntaxKind.ExportDeclaration;
const isExpressionWithTypeArguments = (node: Node): node is ExpressionWithTypeArguments => node.getKind() == SyntaxKind.ExpressionWithTypeArguments;
const isFalseKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.FalseKeyword;
const isFunctionType = (node: Node): node is FunctionTypeNode => node.getKind() == SyntaxKind.FunctionType;
const isFunctionDeclaration = (node: Node): node is FunctionDeclaration => node.getKind() == SyntaxKind.FunctionDeclaration;
const isGetAccessor = (node: Node): node is GetAccessorDeclaration => node.getKind() == SyntaxKind.GetAccessor;
const isHeritageClause = (node: Node): node is HeritageClause => node.getKind() == SyntaxKind.HeritageClause;
const isIdentifier = (node: Node): node is Identifier => node.getKind() == SyntaxKind.Identifier;
const isImportAttribute = (node: Node): node is ImportAttribute => node.getKind() == SyntaxKind.ImportAttribute;
const isImportAttributes = (node: Node): node is ImportAttributes => node.getKind() == SyntaxKind.ImportAttributes;
const isImportClause = (node: Node): node is ImportClause => node.getKind() == SyntaxKind.ImportClause;
const isImportDeclaration = (node: Node): node is ImportDeclaration => node.getKind() == SyntaxKind.ImportDeclaration;
const isImportSpecifier = (node: Node): node is ImportSpecifier => node.getKind() == SyntaxKind.ImportSpecifier;
const isImportType = (node: Node): node is ImportTypeNode => node.getKind() == SyntaxKind.ImportType;
const isIndexedAccessType = (node: Node): node is IndexedAccessTypeNode => node.getKind() == SyntaxKind.IndexedAccessType;
const isIndexSignature = (node: Node): node is IndexSignatureDeclaration => node.getKind() == SyntaxKind.IndexSignature;
const isInferType = (node: Node): node is InferTypeNode => node.getKind() == SyntaxKind.InferType;
const isInterfaceDeclaration = (node: Node): node is InterfaceDeclaration => node.getKind() == SyntaxKind.InterfaceDeclaration;
const isIntersectionType = (node: Node): node is IntersectionTypeNode => node.getKind() == SyntaxKind.IntersectionType;
const isIntrinsicKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.IntrinsicKeyword;
const isLiteralType = (node: Node): node is LiteralTypeNode => node.getKind() == SyntaxKind.LiteralType;
const isMappedType = (node: Node): node is MappedTypeNode => node.getKind() == SyntaxKind.MappedType;
const isMethodDeclaration = (node: Node): node is MethodDeclaration => node.getKind() == SyntaxKind.MethodDeclaration;
const isMethodSignature = (node: Node): node is MethodSignature => node.getKind() == SyntaxKind.MethodSignature;
const isMinusToken = (node: Node): boolean => node.getKind() == SyntaxKind.MinusToken;
const isModifier = (node: Node): boolean => [SyntaxKind.AbstractKeyword, SyntaxKind.DeclareKeyword, SyntaxKind.ExportKeyword, SyntaxKind.PrivateKeyword, SyntaxKind.ProtectedKeyword, SyntaxKind.ReadonlyKeyword, SyntaxKind.StaticKeyword].includes(node.getKind());
const isModuleBlock = (node: Node): node is ModuleBlock => node.getKind() == SyntaxKind.ModuleBlock;
const isModuleDeclaration = (node: Node): node is ModuleDeclaration => node.getKind() == SyntaxKind.ModuleDeclaration;
const isNamedImports = (node: Node): node is NamedImports => node.getKind() == SyntaxKind.NamedImports;
const isNamedTupleMember = (node: Node): node is NamedTupleMember => node.getKind() == SyntaxKind.NamedTupleMember;
const isNamespaceExport = (node: Node): node is NamespaceExport => node.getKind() == SyntaxKind.NamespaceExportDeclaration;
const isNamespaceImport = (node: Node): node is NamespaceImport => node.getKind() == SyntaxKind.NamespaceImport;
const isNeverKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.NeverKeyword;
const isNullKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.NullKeyword;
const isNumberKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.NumberKeyword;
const isNumericLiteral = (node: Node): node is NumericLiteral => node.getKind() == SyntaxKind.NumericLiteral;
const isObjectKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.ObjectKeyword;
const isOptionalType = (node: Node): node is OptionalTypeNode => node.getKind() == SyntaxKind.OptionalType;
const isOverrideKeywork = (node: Node): boolean => node.getKind() == SyntaxKind.OverrideKeyword;
const isParameter = (node: Node): node is ParameterDeclaration => node.getKind() == SyntaxKind.Parameter;
const isParenthesizedType = (node: Node): node is ParenthesizedTypeNode => node.getKind() == SyntaxKind.ParenthesizedType;
const isPrefixUnaryExpression = (node: Node): node is PrefixUnaryExpression => node.getKind() == SyntaxKind.PrefixUnaryExpression;
const isPropertyAccessExpression = (node: Node): node is PropertyAccessExpression => node.getKind() == SyntaxKind.PropertyAccessExpression;
const isPropertyDeclaration = (node: Node): node is PropertyDeclaration => node.getKind() == SyntaxKind.PropertyDeclaration;
const isPropertySignature = (node: Node): node is PropertySignature => node.getKind() == SyntaxKind.PropertySignature;
const isQualifiedName = (node: Node): node is QualifiedName => node.getKind() == SyntaxKind.QualifiedName;
const isQuestionToken = (node: Node): boolean => node.getKind() == SyntaxKind.QuestionToken;
const isRestType = (node: Node): node is RestTypeNode => node.getKind() == SyntaxKind.RestType;
const isSetAccessor = (node: Node): node is SetAccessorDeclaration => node.getKind() == SyntaxKind.SetAccessor;
const isSourceFile = (node: Node): node is SourceFile => node.getKind() == SyntaxKind.SourceFile;
const isStringKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.StringKeyword;
const isStringLiteral = (node: Node): boolean => node.getKind() == SyntaxKind.StringLiteral;
const isSymbolKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.SymbolKeyword;
const isTemplateHead = (node: Node): node is TemplateHead => node.getKind() == SyntaxKind.TemplateHead;
const isTemplateLiteralType = (node: Node): node is TemplateLiteralTypeNode => node.getKind() == SyntaxKind.TemplateLiteralType;
const isTemplateLiteralTypeSpan = (node: Node): boolean => node.getKind() == SyntaxKind.TemplateLiteralTypeSpan;
const isTemplateMiddle = (node: Node): node is TemplateMiddle => node.getKind() == SyntaxKind.TemplateMiddle;
const isTemplateTail = (node: Node): node is TemplateTail => node.getKind() == SyntaxKind.TemplateTail;
const isThisType = (node: Node): node is ThisTypeNode => node.getKind() == SyntaxKind.ThisType;
const isTrueKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.TrueKeyword;
const isTupleType = (node: Node): node is TupleTypeNode => node.getKind() == SyntaxKind.TupleType;
const isTypeAliasDeclaration = (node: Node): node is TypeAliasDeclaration => node.getKind() == SyntaxKind.TypeAliasDeclaration;
const isTypeLiteral = (node: Node): node is TypeLiteralNode => node.getKind() == SyntaxKind.TypeLiteral;
const isTypeOperator = (node: Node): node is TypeOperatorTypeNode => node.getKind() == SyntaxKind.TypeOperator;
const isTypeParameter = (node: Node): node is TypeParameterDeclaration => node.getKind() == SyntaxKind.TypeParameter;
const isTypePredicate = (node: Node): node is TypePredicateNode => node.getKind() == SyntaxKind.TypePredicate;
const isTypeQuery = (node: Node): node is TypeQueryNode => node.getKind() == SyntaxKind.TypeQuery;
const isTypeReference = (node: Node): node is TypeReferenceNode => node.getKind() == SyntaxKind.TypeReference;
const isUndefinedKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.UndefinedKeyword;
const isUnionType = (node: Node): node is UnionTypeNode => node.getKind() == SyntaxKind.UnionType;
const isUnknownKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.UnknownKeyword;
const isVariableDeclaration = (node: Node): node is VariableDeclaration => node.getKind() == SyntaxKind.VariableDeclaration;
const isVariableDeclarationList = (node: Node): node is VariableDeclarationList => node.getKind() == SyntaxKind.VariableDeclarationList;
const isVariableStatement = (node: Node): node is VariableStatement => node.getKind() == SyntaxKind.VariableStatement;
const isVoidKeyworkd = (node: Node): boolean => node.getKind() == SyntaxKind.VoidKeyword;

const processAnyKeyword = (anyKeyword: Node): any => {
    return {
        "kind": anyKeyword.getKindName(),
        "flags": getFlagNames(anyKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processArrayBindingPattern = (arrayBindingPattern: ArrayBindingPattern): any => {
    return {
        "kind": arrayBindingPattern.getKindName(),
        "flags": getFlagNames(arrayBindingPattern.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "elements": arrayBindingPattern.getElements().map(processNode).filter((node) => node != null),
    };
}

const processArrayType = (arrayType: ArrayTypeNode): any => {
    return {
        "kind": arrayType.getKindName(),
        "flags": getFlagNames(arrayType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "elementType": processNode(arrayType.getElementTypeNode()),
    };
};

const processBooleanKeyword = (booleanKeyword: Node): any => {
    return {
        "kind": booleanKeyword.getKindName(),
        "flags": getFlagNames(booleanKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processBigIntKeyword = (bigIntKeyword: Node): any => {
    return {
        "kind": bigIntKeyword.getKindName(),
        "flags": getFlagNames(bigIntKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processBindingElement = (bindingElement: BindingElement): any => {
    return {
        "kind": bindingElement.getKindName(),
        "flags": getFlagNames(bindingElement.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "dotDotDotToken": processNode(bindingElement.getDotDotDotToken()),
        "propertyName": processNode(bindingElement.getPropertyNameNode()),
        "name": processNode(bindingElement.getNameNode()),
        "initializer": processNode(bindingElement.getInitializer()),
    };
};


const processCallSignature = (callSignature: CallSignatureDeclaration): any => {
    return {
        "kind": callSignature.getKindName(),
        "flags": getFlagNames(callSignature.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "typeParameters": callSignature.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": callSignature.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(callSignature.getReturnTypeNode()),
    };
};

const processClassDeclaration = (classDeclaration: ClassDeclaration): any => {
    return {
        "kind": classDeclaration.getKindName(),
        "flags": getFlagNames(classDeclaration.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": classDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(classDeclaration.getNameNode()),
        "typeParameters": classDeclaration.getTypeParameters().map(processNode).filter((node) => node != null),
        "heritageClauses": classDeclaration.getHeritageClauses().map(processNode).filter((node) => node != null),
        "members": classDeclaration.getMembers().map(processNode).filter((node) => node != null),
    };
}

const processComputedPropertyName = (computedPropertyName: ComputedPropertyName): any => {
    return {
        "kind": computedPropertyName.getKindName(),
        "flags": getFlagNames(computedPropertyName.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "expression": processNode(computedPropertyName.getExpression()),
    };
};

const processConditionalType = (conditionalType: ConditionalTypeNode): any => {
    return {
        "kind": conditionalType.getKindName(),
        "flags": getFlagNames(conditionalType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "checkType": processNode(conditionalType.getCheckType()),
        "extendsType": processNode(conditionalType.getExtendsType()),
        "trueType": processNode(conditionalType.getTrueType()),
        "falseType": processNode(conditionalType.getFalseType()),
    };
};

const processConstructorDeclaration = (constructor: ConstructorDeclaration): any => {
    return {
        "kind": constructor.getKindName(),
        "flags": getFlagNames(constructor.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "typeParameters": constructor.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": constructor.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(constructor.getReturnTypeNode()),
    };
};

const processConstructorType = (constructorType: ConstructorTypeNode): any => {
    return {
        "kind": constructorType.getKindName(),
        "flags": getFlagNames(constructorType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": constructorType.getModifiers().map(processNode).filter((node) => node != null),
        "typeParameters": constructorType.compilerNode.typeParameters?.map((n) => processNode(createWrappedNode(n))).filter((node) => node != null),
        "parameters": constructorType.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(constructorType.getReturnTypeNode()),
    };
};

const processConstructSignature = (constructSignature: ConstructSignatureDeclaration): any => {
    return {
        "kind": constructSignature.getKindName(),
        "flags": getFlagNames(constructSignature.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "typeParameters": constructSignature.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": constructSignature.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(constructSignature.getReturnTypeNode()),
    };
};


const processEnumDeclaration = (enumDeclaration: EnumDeclaration): any => {
    return {
        "kind": enumDeclaration.getKindName(),
        "flags": getFlagNames(enumDeclaration.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": enumDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(enumDeclaration.getNameNode()),
        "members": enumDeclaration.getMembers().map(processNode).filter((node) => node != null),
    };
};

const processEnumMember = (enumMember: EnumMember): any => {
    return {
        "kind": enumMember.getKindName(),
        "flags": getFlagNames(enumMember.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "name": processNode(enumMember.getNameNode()),
        "initializer": processNode(enumMember.getInitializer()),
    };
};

const processExportDeclaration = (exportDeclaration: ExportDeclaration): any => {
    return {
        "kind": exportDeclaration.getKindName(),
        "flags": getFlagNames(exportDeclaration.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "isTypeOnly": exportDeclaration.compilerNode.isTypeOnly,
        "namespaceExport": processNode(exportDeclaration.getNamespaceExport()),
        "moduleSpecifier": processNode(exportDeclaration.getModuleSpecifierSourceFile()),
    };
}

const processExpressionWithTypeArguments = (expressionWithTypeArguments: ExpressionWithTypeArguments): any => {
    return {
        "kind": expressionWithTypeArguments.getKindName(),
        "flags": getFlagNames(expressionWithTypeArguments.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "expression": processNode(expressionWithTypeArguments.getExpression()),
        "typeArguments": expressionWithTypeArguments.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};

const processFalseKeyword = (falseKeyword: Node): any => {
    return {
        "kind": falseKeyword.getKindName(),
        "flags": getFlagNames(falseKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processFunctionDeclaration = (functionDeclaration: FunctionDeclaration): any => {
    return {
        "kind": functionDeclaration.getKindName(),
        "flags": getFlagNames(functionDeclaration.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": functionDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "asteriskToken": processNode(functionDeclaration.getAsteriskToken()),
        "name": processNode(functionDeclaration.getNameNode()),
        "typeParameters": functionDeclaration.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": functionDeclaration.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(functionDeclaration.getReturnTypeNode())
    };
};

const processFunctionType = (functionType: FunctionTypeNode): any => {
    return {
        "kind": functionType.getKindName(),
        "flags": getFlagNames(functionType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "typeParameters": functionType.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": functionType.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(functionType.getReturnTypeNode()),
    };
};

const processGetAccessor = (getAccessor: GetAccessorDeclaration): any => {
    return {
        "kind": getAccessor.getKindName(),
        "flags": getFlagNames(getAccessor.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": getAccessor.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(getAccessor.getNameNode()),
        "typeParameters": getAccessor.getTypeParameters().map(processNode).filter((node) => node != null),
        "type": processNode(getAccessor.getReturnTypeNode()),
    };
};

const processHeritageClause = (heritageClause: HeritageClause): any => {
    return {
        "kind": heritageClause.getKindName(),
        "flags": getFlagNames(heritageClause.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "token": {
            "kind": heritageClause.getToken() == SyntaxKind.ExtendsKeyword ? "ExtendsKeyword" : "ImplementsKeyword",
        },
        "types": heritageClause.getTypeNodes().map(processNode).filter((node) => node != null),
    };
};

const processIdentifier = (identifier: Identifier): any => {
    return {
        "kind": identifier.getKindName(),
        "flags": getFlagNames(identifier.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "text": identifier.getText(),
    };
}

const processImportAttribute = (importAttribute: ImportAttribute): any => {
    return {
        "kind": importAttribute.getKindName(),
        "flags": getFlagNames(importAttribute.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "name": processNode(importAttribute.getNameNode()),
        "value": processNode(importAttribute.getValue()),
    };
};

const processImportAttributes = (importAttributes: ImportAttributes): any => {
    return {
        "kind": importAttributes.getKindName(),
        "flags": getFlagNames(importAttributes.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "elements": importAttributes.getElements().map(processNode).filter((node) => node != null),
    };
};

const processImportClause = (importClause: ImportClause): any => {
    return {
        "kind": importClause.getKindName(),
        "flags": getFlagNames(importClause.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "isTypeOnly": importClause.compilerNode.isTypeOnly,
        "name": importClause.compilerNode.name ? processNode(createWrappedNode(importClause.compilerNode.name)) : undefined,
        "namedBindings": processNode(importClause.getNamedBindings()),
    };
};

const processImportDeclaration = (importDeclaration: ImportDeclaration): any => {
    return {
        "kind": importDeclaration.getKindName(),
        "flags": getFlagNames(importDeclaration.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": importDeclaration.compilerNode.modifiers?.map((n) => processNode(createWrappedNode(n))).filter((node) => node != null),
        "importClause": processNode(importDeclaration.getImportClause()),
        "moduleSpecifier": processNode(importDeclaration.getModuleSpecifier()),
        "importAttributes": processNode(importDeclaration.getAttributes()),
    };
}

const processImportSpecifier = (importSpecifier: ImportSpecifier): any => {
    return {
        "kind": importSpecifier.getKindName(),
        "flags": getFlagNames(importSpecifier.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "isTypeOnly": importSpecifier.compilerNode.isTypeOnly,
        "name": processNode(importSpecifier.getNameNode()),
        "propertyName": importSpecifier.compilerNode.propertyName ? processNode(createWrappedNode(importSpecifier.compilerNode.propertyName)) : undefined,
    };
};

const processImportType = (importType: ImportTypeNode): any => {
    return {
        "kind": importType.getKindName(),
        "flags": getFlagNames(importType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "argument": processNode(importType.getArgument()),
        "attributes": processNode(importType.getAttributes()),
        "qualifier": processNode(importType.getQualifier()),
        "typeArguments": importType.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};

const processIndexedAccessType = (indexedAccessType: IndexedAccessTypeNode): any => {
    return {
        "kind": indexedAccessType.getKindName(),
        "flags": getFlagNames(indexedAccessType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "objectType": processNode(indexedAccessType.getObjectTypeNode()),
        "indexType": processNode(indexedAccessType.getIndexTypeNode()),
    };
};

const processIndexSignature = (indexSignature: IndexSignatureDeclaration): any => {
    return {
        "kind": indexSignature.getKindName(),
        "flags": getFlagNames(indexSignature.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": indexSignature.getModifiers().map(processNode).filter((node) => node != null),
        "parameters": indexSignature.compilerNode.parameters.map((p) => processNode(createWrappedNode(p))).filter((node) => node != null),
        "type": processNode(indexSignature.getReturnTypeNode()),
    };
};

const processInferType = (inferType: InferTypeNode): any => {
    return {
        "kind": inferType.getKindName(),
        "flags": getFlagNames(inferType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "typeParameter": processNode(inferType.getTypeParameter()),
    };
};

const processInterfaceDeclaration = (interfaceDeclaration: InterfaceDeclaration): any => {
    return {
        "kind": interfaceDeclaration.getKindName(),
        "flags": getFlagNames(interfaceDeclaration.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": interfaceDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(interfaceDeclaration.getNameNode()),
        "typeParameters": interfaceDeclaration.getTypeParameters().map(processNode).filter((node) => node != null),
        "heritageClauses": interfaceDeclaration.getHeritageClauses().map(processNode).filter((node) => node != null),
        "members": interfaceDeclaration.getMembers().map(processNode).filter((node) => node != null),
    };
};

const processIntersectionType = (intersectionType: IntersectionTypeNode): any => {
    return {
        "kind": intersectionType.getKindName(),
        "flags": getFlagNames(intersectionType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "types": intersectionType.getTypeNodes().map(processNode).filter((node) => node != null),
    };
};

const processIntrinsicKeyword = (intrinsicKeyword: Node): any => {
    return {
        "kind": intrinsicKeyword.getKindName(),
        "flags": getFlagNames(intrinsicKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
}

const processLiteralType = (literalType: LiteralTypeNode): any => {
    return {
        "kind": literalType.getKindName(),
        "flags": getFlagNames(literalType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "literal": processNode(literalType.getLiteral()),
    };
};

const processMappedType = (mappedType: MappedTypeNode): any => {
    return {
        "kind": mappedType.getKindName(),
        "flags": getFlagNames(mappedType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "readonlyToken": processNode(mappedType.getReadonlyToken()),
        "typeParameter": processNode(mappedType.getTypeParameter()),
        "nameType": processNode(mappedType.getNameTypeNode()),
        "questionToken": processNode(mappedType.getQuestionToken()),
        "type": processNode(mappedType.getTypeNode()),
        "members": mappedType.compilerNode.members?.map((n) => processNode(createWrappedNode(n))).filter((node) => node != null),
    };
};

const processMethodDeclaration = (methodDeclaration: MethodDeclaration): any => {
    return {
        "kind": methodDeclaration.getKindName(),
        "flags": getFlagNames(methodDeclaration.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": methodDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(methodDeclaration.getNameNode()),
        "asteriskToken": processNode(methodDeclaration.getAsteriskToken()),
        "questionToken": processNode(methodDeclaration.getQuestionTokenNode()),
        "typeParameters": methodDeclaration.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": methodDeclaration.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(methodDeclaration.getReturnTypeNode())
    };
};

const processMethodSignature = (methodSignature: MethodSignature): any => {
    return {
        "kind": methodSignature.getKindName(),
        "flags": getFlagNames(methodSignature.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "name": processNode(methodSignature.getNameNode()),
        "questionToken": processNode(methodSignature.getQuestionTokenNode()),
        "typeParameters": methodSignature.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": methodSignature.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(methodSignature.getReturnTypeNode())
    };
};

const processMinusToken = (minusToken: Node): any => {
    return {
        "kind": minusToken.getKindName(),
        "flags": getFlagNames(minusToken.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
}

const processModifier = (modifier: Node): any => {
    return {
        "kind": modifier.getKindName(),
        "flags": getFlagNames(modifier.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processModuleBlock = (moduleBlock: ModuleBlock): any => {
    return {
        "kind": moduleBlock.getKindName(),
        "flags": getFlagNames(moduleBlock.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "statements": moduleBlock.getStatements().map(processNode).filter((node) => node != null),
    };
};

const processModuleDeclaration = (moduleDeclaration: ModuleDeclaration): any => {
    return {
        "kind": moduleDeclaration.getKindName(),
        "flags": getFlagNames(moduleDeclaration.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": moduleDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(moduleDeclaration.getNameNode()),
        "declarationKind": moduleDeclaration.getDeclarationKind(),
        "body": processNode(moduleDeclaration.getBody()),
    };
};

const processNamedImports = (namedImports: NamedImports): any => {
    return {
        "kind": namedImports.getKindName(),
        "flags": getFlagNames(namedImports.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "elements": namedImports.getElements().map(processNode).filter((node) => node != null),
    };
};

const processNamedTupleMember = (namedTupleMember: NamedTupleMember): any => {
    return {
        "kind": namedTupleMember.getKindName(),
        "flags": getFlagNames(namedTupleMember.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "name": processNode(namedTupleMember.getNameNode()),
        "type": processNode(namedTupleMember.getTypeNode()),
    };
};

const processNamespaceImport = (namespaceImport: NamespaceImport): any => {
    return {
        "kind": namespaceImport.getKindName(),
        "flags": getFlagNames(namespaceImport.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "name": processNode(namespaceImport.getNameNode()),
    };
};

const processNeverKeyword = (neverKeyword: Node): any => {
    return {
        "kind": neverKeyword.getKindName(),
        "flags": getFlagNames(neverKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processNullKeyword = (nullKeyword: Node): any => {
    return {
        "kind": nullKeyword.getKindName(),
        "flags": getFlagNames(nullKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processNumberKeyword = (numberKeyword: Node): any => {
    return {
        "kind": numberKeyword.getKindName(),
        "flags": getFlagNames(numberKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processNumericLiteral = (numericLiteral: NumericLiteral): any => {
    return {
        "kind": numericLiteral.getKindName(),
        "flags": getFlagNames(numericLiteral.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "text": numericLiteral.getText(),
    };
};

const processObjectKeyword = (objectKeyword: Node): any => {
    return {
        "kind": objectKeyword.getKindName(),
        "flags": getFlagNames(objectKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processOptionalType = (optionalType: OptionalTypeNode): any => {
    return {
        "kind": optionalType.getKindName(),
        "flags": getFlagNames(optionalType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "type": processNode(optionalType.getTypeNode()),
    };
}

const processOverrideKeyword = (overrideKeywork: Node): any => {
    return {
        "kind": overrideKeywork.getKindName(),
        "flags": getFlagNames(overrideKeywork.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
}

const processParameter = (parameter: ParameterDeclaration): any => {
    return {
        "kind": parameter.getKindName(),
        "flags": getFlagNames(parameter.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": parameter.getModifiers().map(processNode).filter((node) => node != null),
        "dotDotDotToken": parameter.getDotDotDotToken() != undefined,
        "name": processNode(parameter.getNameNode()),
        "questionToken": processNode(parameter.getQuestionTokenNode()),
        "type": processNode(parameter.getTypeNode()),
        "initializer": processNode(parameter.getInitializer()),
    };
};

const processParenthesizedType = (parenthesizedType: ParenthesizedTypeNode): any => {
    return {
        "kind": parenthesizedType.getKindName(),
        "flags": getFlagNames(parenthesizedType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "type": processNode(parenthesizedType.getTypeNode()),
    };
};

const processPrefixUnaryExpression = (prefixUnaryExpression: PrefixUnaryExpression): any => {
    return {
        "kind": prefixUnaryExpression.getKindName(),
        "flags": getFlagNames(prefixUnaryExpression.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "operator": {
            "kind": SyntaxKind[prefixUnaryExpression.getOperatorToken().toString()]
        },
        "operand": processNode(prefixUnaryExpression.getOperand()),
    };
};

const processPropertyAccessExpression = (propertyAccessExpression: PropertyAccessExpression): any => {
    return {
        "kind": propertyAccessExpression.getKindName(),
        "flags": getFlagNames(propertyAccessExpression.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "expression": processNode(propertyAccessExpression.getExpression()),
        "questionDotToken": processNode(propertyAccessExpression.getQuestionDotTokenNode()),
        "name": processNode(propertyAccessExpression.getNameNode()),
    };
};

const processPropertyDeclaration = (propertyDeclaration: PropertyDeclaration): any => {
    return {
        "kind": propertyDeclaration.getKindName(),
        "flags": getFlagNames(propertyDeclaration.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": propertyDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(propertyDeclaration.getNameNode()),
        "questionToken": processNode(propertyDeclaration.getQuestionTokenNode()),
        "exclamationToken": processNode(propertyDeclaration.getExclamationTokenNode()),
        "type": processNode(propertyDeclaration.getTypeNode()),
        "initializer": processNode(propertyDeclaration.getInitializer()),
    };
};

const processPropertySignature = (propertySignature: PropertySignature): any => {
    return {
        "kind": propertySignature.getKindName(),
        "flags": getFlagNames(propertySignature.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": propertySignature.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(propertySignature.getNameNode()),
        "questionToken": processNode(propertySignature.getQuestionTokenNode()),
        "type": processNode(propertySignature.getTypeNode()),
        "initializer": processNode(propertySignature.getInitializer()),
    };
};

const processQualifiedName = (qualifiedName: QualifiedName): any => {
    return {
        "kind": qualifiedName.getKindName(),
        "flags": getFlagNames(qualifiedName.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "left": processNode(qualifiedName.getLeft()),
        "right": processNode(qualifiedName.getRight()),
    };
};

const processQuestionToken = (questionToken: Node): any => {
    return {
        "kind": questionToken.getKindName(),
        "flags": getFlagNames(questionToken.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processRestType = (restType: RestTypeNode): any => {
    return {
        "kind": restType.getKindName(),
        "flags": getFlagNames(restType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "type": processNode(restType.getTypeNode()),
    };
};

const processSetAccessor = (setAccessor: SetAccessorDeclaration): any => {
    return {
        "kind": setAccessor.getKindName(),
        "flags": getFlagNames(setAccessor.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": setAccessor.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(setAccessor.getNameNode()),
        "typeParameters": setAccessor.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": setAccessor.getParameters().map(processNode).filter((node) => node != null),
    };
};

const processSourceFile = (sourceFile: SourceFile): any => {
    return {
        "kind": sourceFile.getKindName(),
        "flags": getFlagNames(sourceFile.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "baseName": sourceFile.getBaseName(),
        "statements": sourceFile.getStatements().map(processNode).filter((node) => node != null)
    };
};

const processStringKeyword = (stringKeyword: Node): any => {
    return {
        "kind": stringKeyword.getKindName(),
        "flags": getFlagNames(stringKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processStringLiteral = (stringLiteral: Node): any => {
    return {
        "kind": stringLiteral.getKindName(),
        "flags": getFlagNames(stringLiteral.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "text": stringLiteral.getText(),
    };
};

const processSymbolKeyword = (symbolKeyword: Node): any => {
    return {
        "kind": symbolKeyword.getKindName(),
        "flags": getFlagNames(symbolKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processTemplateHead = (templateHead: TemplateHead): any => {
    return {
        "kind": templateHead.getKindName(),
        "flags": getFlagNames(templateHead.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "text": templateHead.getText(),
    };
};

const processTemplateLiteralType = (templateLiteralType: TemplateLiteralTypeNode): any => {
    return {
        "kind": templateLiteralType.getKindName(),
        "flags": getFlagNames(templateLiteralType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "head": processNode(templateLiteralType.getHead()),
        "templateSpans": templateLiteralType.getTemplateSpans().map(processNode).filter((node) => node != null),
    };
}

const processTemplateLiteralTypeSpan = (templateLiteralTypeSpan: Node): any => {
    const compilerNode = templateLiteralTypeSpan.compilerNode as TemplateLiteralTypeSpan;
    return {
        "kind": templateLiteralTypeSpan.getKindName(),
        "flags": getFlagNames(templateLiteralTypeSpan.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "type": processNode(createWrappedNode(compilerNode.type)),
        "literal": processNode(createWrappedNode(compilerNode.literal)),
    };
}

const processTemplateMiddle = (templateTail: TemplateMiddle): any => {
    return {
        "kind": templateTail.getKindName(),
        "flags": getFlagNames(templateTail.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "text": templateTail.getText(),
    };
}


const processTemplateTail = (templateTail: TemplateTail): any => {
    return {
        "kind": templateTail.getKindName(),
        "flags": getFlagNames(templateTail.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "text": templateTail.getText(),
    };
}

const processThisType = (thisType: ThisTypeNode): any => {
    return {
        "kind": thisType.getKindName(),
        "flags": getFlagNames(thisType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processTrueKeyword = (trueKeyword: Node): any => {
    return {
        "kind": trueKeyword.getKindName(),
        "flags": getFlagNames(trueKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processTupleType = (tupleType: TupleTypeNode): any => {
    return {
        "kind": tupleType.getKindName(),
        "flags": getFlagNames(tupleType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "elements": tupleType.getElements().map(processNode).filter((node) => node != null),
    };
};

const processTypeAliasDeclaration = (typeAliasDeclaration: TypeAliasDeclaration): any => {
    return {
        "kind": typeAliasDeclaration.getKindName(),
        "flags": getFlagNames(typeAliasDeclaration.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": typeAliasDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(typeAliasDeclaration.getNameNode()),
        "typeParameters": typeAliasDeclaration.getTypeParameters().map(processNode).filter((node) => node != null),
        "type": processNode(typeAliasDeclaration.getTypeNode()),
    };
};

const processTypeLiteral = (typeLiteral: TypeLiteralNode): any => {
    return {
        "kind": typeLiteral.getKindName(),
        "flags": getFlagNames(typeLiteral.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "members": typeLiteral.getMembers().map(processNode).filter((node) => node != null),
    };
}

const processTypeOperator = (typeOperator: TypeOperatorTypeNode): any => {
    return {
        "kind": typeOperator.getKindName(),
        "flags": getFlagNames(typeOperator.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "operator": {
            "kind": SyntaxKind[typeOperator.getOperator().toString()]
        },
        "type": processNode(typeOperator.getTypeNode()),
    };
};

const processTypeParameter = (typeParameter: TypeParameterDeclaration): any => {
    return {
        "kind": typeParameter.getKindName(),
        "flags": getFlagNames(typeParameter.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": typeParameter.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(typeParameter.getNameNode()),
        "constraint": processNode(typeParameter.getConstraint()),
        "default": processNode(typeParameter.getDefault()),
    };
};

const processTypePredicate = (typePredicate: TypePredicateNode): any => {
    return {
        "kind": typePredicate.getKindName(),
        "flags": getFlagNames(typePredicate.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "assertsModifier": processNode(typePredicate.getAssertsModifier()),
        "parameterName": processNode(typePredicate.getParameterNameNode()),
        "type": processNode(typePredicate.getTypeNode()),
    };
};

const processTypeQuery = (typeQuery: TypeQueryNode): any => {
    return {
        "kind": typeQuery.getKindName(),
        "flags": getFlagNames(typeQuery.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "exprName": processNode(typeQuery.getExprName()),
        "typeArguments": typeQuery.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};

const processTypeReference = (typeReference: TypeReferenceNode): any => {
    return {
        "kind": typeReference.getKindName(),
        "flags": getFlagNames(typeReference.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "typeName": processNode(typeReference.getTypeName()),
        "typeArguments": typeReference.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};

const processUndefinedKeyword = (undefinedKeyword: Node): any => {
    return {
        "kind": undefinedKeyword.getKindName(),
        "flags": getFlagNames(undefinedKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processUnionType = (unionType: UnionTypeNode): any => {
    return {
        "kind": unionType.getKindName(),
        "flags": getFlagNames(unionType.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "types": unionType.getTypeNodes().map(processNode).filter((node) => node != null),
    };
};

const processUnknownKeyword = (unknownKeyword: Node): any => {
    return {
        "kind": unknownKeyword.getKindName(),
        "flags": getFlagNames(unknownKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
};

const processVariableDeclaration = (variableDeclaration: VariableDeclaration): any => {
    return {
        "kind": variableDeclaration.getKindName(),
        "flags": getFlagNames(variableDeclaration.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "name": processNode(variableDeclaration.getNameNode()),
        "exclamationToken": processNode(variableDeclaration.getExclamationTokenNode()),
        "type": processNode(variableDeclaration.getTypeNode()),
        "initializer": processNode(variableDeclaration.getInitializer()),
    };
};

const processVariableDeclarationList = (variableDeclarationList: VariableDeclarationList): any => {
    return {
        "kind": variableDeclarationList.getKindName(),
        "flags": getFlagNames(variableDeclarationList.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "declarations": variableDeclarationList.getDeclarations().map(processNode).filter((node) => node != null),
    };
};

const processVariableStatement = (variableStatement: VariableStatement): any => {
    return {
        "kind": variableStatement.getKindName(),
        "flags": getFlagNames(variableStatement.getFlags(), NodeFlags, NodeFlags.ContextFlags),
        "modifiers": variableStatement.getModifiers().map(processNode).filter((node) => node != null),
        "declarationList": processNode(variableStatement.getDeclarationList()),
    };
};

const processVoidKeyword = (voidKeyword: Node): any => {
    return {
        "kind": voidKeyword.getKindName(),
        "flags": getFlagNames(voidKeyword.getFlags(), NodeFlags, NodeFlags.ContextFlags),
    };
}

const processNode = (node?: Node): any => {
    if (node == undefined || node == null) {
        return null;
    } else if (isAnyKeyword(node)) {
        return processAnyKeyword(node);
    } else if (isArrayBindingPattern(node)) {
        return processArrayBindingPattern(node);
    } else if (isArrayType(node)) {
        return processArrayType(node);
    } else if (isBooleanKeyword(node)) {
        return processBooleanKeyword(node);
    } else if (isBigIntKeyword(node)) {
        return processBigIntKeyword(node);
    } else if (isBindingElement(node)) {
        return processBindingElement(node);
    } else if (isCallSignature(node)) {
        return processCallSignature(node);
    } else if (isClassDeclaration(node)) {
        return processClassDeclaration(node);
    } else if (isComputedPropertyName(node)) {
        return processComputedPropertyName(node);
    } else if (isConditionalType(node)) {
        return processConditionalType(node);
    } else if (isConstructordeclaration(node)) {
        return processConstructorDeclaration(node);
    } else if (isConstructorType(node)) {
        return processConstructorType(node);
    } else if (isConstructSignature(node)) {
        return processConstructSignature(node);
    } else if (isEnumDeclaration(node)) {
        return processEnumDeclaration(node);
    } else if (isEnumMember(node)) {
        return processEnumMember(node);
    } else if (isExportDeclaration(node)) {
        return processExportDeclaration(node);
    } else if (isExpressionWithTypeArguments(node)) {
        return processExpressionWithTypeArguments(node);
    } else if (isFalseKeyword(node)) {
        return processFalseKeyword(node);
    } else if (isFunctionDeclaration(node)) {
        return processFunctionDeclaration(node);
    } else if (isFunctionType(node)) {
        return processFunctionType(node);
    } else if (isGetAccessor(node)) {
        return processGetAccessor(node);
    } else if (isHeritageClause(node)) {
        return processHeritageClause(node);
    } else if (isIdentifier(node)) {
        return processIdentifier(node);
    } else if (isImportAttribute(node)) {
        return processImportAttribute(node);
    } else if (isImportAttributes(node)) {
        return processImportAttributes(node);
    } else if (isImportClause(node)) {
        return processImportClause(node);
    } else if (isImportDeclaration(node)) {
        return processImportDeclaration(node);
    } else if (isImportSpecifier(node)) {
        return processImportSpecifier(node);
    } else if (isImportType(node)) {
        return processImportType(node);
    } else if (isIndexedAccessType(node)) {
        return processIndexedAccessType(node);
    } else if (isIndexSignature(node)) {
        return processIndexSignature(node);
    } else if (isInferType(node)) {
        return processInferType(node);
    } else if (isInterfaceDeclaration(node)) {
        return processInterfaceDeclaration(node);
    } else if (isIntersectionType(node)) {
        return processIntersectionType(node);
    } else if (isIntrinsicKeyword(node)) {
        return processIntrinsicKeyword(node);
    } else if (isLiteralType(node)) {
        return processLiteralType(node);
    } else if (isMappedType(node)) {
        return processMappedType(node);
    } else if (isMethodDeclaration(node)) {
        return processMethodDeclaration(node);
    } else if (isMethodSignature(node)) {
        return processMethodSignature(node);
    } else if (isMinusToken(node)) {
        return processMinusToken(node);
    } else if (isModifier(node)) {
        return processModifier(node);
    } else if (isModuleBlock(node)) {
        return processModuleBlock(node);
    } else if (isModuleDeclaration(node)) {
        return processModuleDeclaration(node);
    } else if (isNamedImports(node)) {
        return processNamedImports(node);
    } else if (isNamedTupleMember(node)) {
        return processNamedTupleMember(node);
    } else if (isNamespaceImport(node)) {
        return processNamespaceImport(node);
    } else if (isNamespaceExport(node)) {
        return null;
    } else if (isNeverKeyword(node)) {
        return processNeverKeyword(node);
    } else if (isNullKeyword(node)) {
        return processNullKeyword(node);
    } else if (isNumberKeyword(node)) {
        return processNumberKeyword(node);
    } else if (isNumericLiteral(node)) {
        return processNumericLiteral(node);
    } else if (isObjectKeyword(node)) {
        return processObjectKeyword(node);
    } else if (isOptionalType(node)) {
        return processOptionalType(node);
    } else if (isOverrideKeywork(node)) {
        return processOverrideKeyword(node);
    } else if (isParameter(node)) {
        return processParameter(node);
    } else if (isParenthesizedType(node)) {
        return processParenthesizedType(node);
    } else if (isPrefixUnaryExpression(node)) {
        return processPrefixUnaryExpression(node);
    } else if (isPropertyAccessExpression(node)) {
        return processPropertyAccessExpression(node);
    } else if (isPropertyDeclaration(node)) {
        return processPropertyDeclaration(node);
    } else if (isPropertySignature(node)) {
        return processPropertySignature(node);
    } else if (isQualifiedName(node)) {
        return processQualifiedName(node);
    } else if (isQuestionToken(node)) {
        return processQuestionToken(node);
    } else if (isRestType(node)) {
        return processRestType(node);
    } else if (isSetAccessor(node)) {
        return processSetAccessor(node);
    } else if (isSourceFile(node)) {
        return processSourceFile(node);
    } else if (isStringKeyword(node)) {
        return processStringKeyword(node);
    } else if (isStringLiteral(node)) {
        return processStringLiteral(node);
    } else if (isSymbolKeyword(node)) {
        return processSymbolKeyword(node);
    } else if (isTemplateHead(node)) {
        return processTemplateHead(node);
    } else if (isTemplateLiteralType(node)) {
        return processTemplateLiteralType(node);
    } else if (isTemplateLiteralTypeSpan(node)) {
        return processTemplateLiteralTypeSpan(node);
    } else if (isTemplateMiddle(node)) {
        return processTemplateMiddle(node);
    } else if (isTemplateTail(node)) {
        return processTemplateTail(node);
    } else if (isThisType(node)) {
        return processThisType(node);
    } else if (isTrueKeyword(node)) {
        return processTrueKeyword(node);
    } else if (isTupleType(node)) {
        return processTupleType(node);
    } else if (isTypeAliasDeclaration(node)) {
        return processTypeAliasDeclaration(node);
    } else if (isTypeLiteral(node)) {
        return processTypeLiteral(node);
    } else if (isTypeOperator(node)) {
        return processTypeOperator(node);
    } else if (isTypeParameter(node)) {
        return processTypeParameter(node);
    } else if (isTypePredicate(node)) {
        return processTypePredicate(node);
    } else if (isTypeQuery(node)) {
        return processTypeQuery(node);
    } else if (isTypeReference(node)) {
        return processTypeReference(node);
    } else if (isUndefinedKeyword(node)) {
        return processUndefinedKeyword(node);
    } else if (isUnionType(node)) {
        return processUnionType(node);
    } else if (isUnknownKeyword(node)) {
        return processUnknownKeyword(node);
    } else if (isVariableDeclaration(node)) {
        return processVariableDeclaration(node);
    } else if (isVariableDeclarationList(node)) {
        return processVariableDeclarationList(node);
    } else if (isVariableStatement(node)) {
        return processVariableStatement(node);
    } else if (isVoidKeyworkd(node)) {
        return processVoidKeyword(node);
    } else {
        console.log("WARNING: unsupported syntax kind: " + node.getKindName() + " (" + node.getSourceFile().getBaseName() + ")")
    }
};

function parseFromNpm(directory: string): any {
    const project = new Project({
        compilerOptions: {
            target: ScriptTarget.ESNext,
        },
        skipAddingFilesFromTsConfig: true
    });

    const packageJson = JSON.parse(readFileSync(directory + "/package.json").toString());
    const typesFile = packageJson.types;

    //project.addSourceFilesAtPaths(directory + "/**/*.d.ts");
    project.addSourceFilesAtPaths(directory + "/" + typesFile);

    const sourceFiles = <any>[];
    project.getSourceFiles().forEach((sourceFile: SourceFile) => {
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

async function httpDownload(directory: string, root: string, tag: string): Promise<void> {
    const filename = directory + root + ".d.ts";
    const response = await fetch("https://raw.githubusercontent.com/microsoft/TypeScript/" + tag + "/src/lib/" + root + ".d.ts");
    const content = await response.text();

    writeFileSync(directory + root + ".d.ts", content);

    const matches = content.matchAll(/\/\/\/ <reference lib="(.*)" \/>/g);
    for(const match of matches){    
        await httpDownload(directory, match[1], tag);
    }
}

async function parseFromTypescript(directory: string, root: string, tag: string): Promise<any> {
    if (!existsSync(directory)){
        mkdirSync(directory);
    }

    await httpDownload(directory, root, tag);

    const project = new Project({
        compilerOptions: {
            target: ScriptTarget.ESNext,
        },
        skipAddingFilesFromTsConfig: true
    });

    project.addSourceFilesAtPaths(directory + "**/*.d.ts");

    const sourceFiles = <any>[];
    project.getSourceFiles().forEach((sourceFile: SourceFile) => {
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

export { parseFromNpm, parseFromTypescript };

