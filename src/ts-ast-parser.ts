import { ArrayTypeNode, CallSignatureDeclaration, ClassDeclaration, ComputedPropertyName, ConditionalTypeNode, ConstructorDeclaration, ConstructorTypeNode, ConstructSignatureDeclaration, createWrappedNode, EnumDeclaration, EnumMember, ExportDeclaration, ExpressionWithTypeArguments, FunctionDeclaration, FunctionTypeNode, GetAccessorDeclaration, HeritageClause, Identifier, ImportAttribute, ImportAttributes, ImportClause, ImportDeclaration, ImportSpecifier, ImportTypeNode, IndexedAccessTypeNode, IndexSignatureDeclaration, InferTypeNode, InterfaceDeclaration, IntersectionTypeNode, LiteralTypeNode, MappedTypeNode, MethodDeclaration, MethodSignature, ModuleBlock, ModuleDeclaration, NamedImports, NamespaceExport, NamespaceImport, Node, NumericLiteral, ParameterDeclaration, ParenthesizedTypeNode, PrefixUnaryExpression, Project, PropertyAccessExpression, PropertyDeclaration, PropertySignature, QualifiedName, RestTypeNode, ScriptTarget, SetAccessorDeclaration, SourceFile, ThisTypeNode, TupleTypeNode, TypeAliasDeclaration, TypeLiteralNode, TypeOperatorTypeNode, TypeParameterDeclaration, TypePredicateNode, TypeQueryNode, TypeReferenceNode, UnionTypeNode, VariableDeclaration, VariableDeclarationList, VariableStatement } from "ts-morph";
import { SyntaxKind } from "typescript";

const isAnyKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.AnyKeyword;
const isArrayType = (node: Node): node is ArrayTypeNode => node.getKind() == SyntaxKind.ArrayType;
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
const isLiteralType = (node: Node): node is LiteralTypeNode => node.getKind() == SyntaxKind.LiteralType;
const isMappedType = (node: Node): node is MappedTypeNode => node.getKind() == SyntaxKind.MappedType;
const isMethodDeclaration = (node: Node): node is MethodDeclaration => node.getKind() == SyntaxKind.MethodDeclaration;
const isMethodSignature = (node: Node): node is MethodSignature => node.getKind() == SyntaxKind.MethodSignature;
const isModifier = (node: Node): boolean => [SyntaxKind.AbstractKeyword, SyntaxKind.DeclareKeyword, SyntaxKind.ExportKeyword, SyntaxKind.PrivateKeyword, SyntaxKind.ProtectedKeyword, SyntaxKind.ReadonlyKeyword, SyntaxKind.StaticKeyword].includes(node.getKind());
const isModuleBlock = (node: Node): node is ModuleBlock => node.getKind() == SyntaxKind.ModuleBlock;
const isModuleDeclaration = (node: Node): node is ModuleDeclaration => node.getKind() == SyntaxKind.ModuleDeclaration;
const isNamedImports = (node: Node): node is NamedImports => node.getKind() == SyntaxKind.NamedImports;
const isNamespaceExport = (node: Node): node is NamespaceExport => node.getKind() == SyntaxKind.NamespaceExportDeclaration;
const isNamespaceImport = (node: Node): node is NamespaceImport => node.getKind() == SyntaxKind.NamespaceImport;
const isNeverKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.NeverKeyword;
const isNullKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.NullKeyword;
const isNumberKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.NumberKeyword;
const isNumericLiteral = (node: Node): node is NumericLiteral => node.getKind() == SyntaxKind.NumericLiteral;
const isObjectKeyword = (node: Node): boolean => node.getKind() == SyntaxKind.ObjectKeyword;
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
    };
};

const processArrayType = (arrayType: ArrayTypeNode): any => {
    return {
        "kind": arrayType.getKindName(),
        "elementType": processNode(arrayType.getElementTypeNode()),
    };
};

const processBooleanKeyword = (booleanKeyword: Node): any => {
    return {
        "kind": booleanKeyword.getKindName(),
    };
};

const processCallSignature = (callSignature: CallSignatureDeclaration): any => {
    return {
        "kind": callSignature.getKindName(),
        "typeParameters": callSignature.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": callSignature.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(callSignature.getReturnTypeNode()),
    };
};

const processClassDeclaration = (classDeclaration: ClassDeclaration): any => {
    return {
        "kind": classDeclaration.getKindName(),
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
        "expression": processNode(computedPropertyName.getExpression()),
    };
};

const processConditionalType = (conditionalType: ConditionalTypeNode): any => {
    return {
        "kind": conditionalType.getKindName(),
        "checkType": processNode(conditionalType.getCheckType()),
        "extendsType": processNode(conditionalType.getExtendsType()),
        "trueType": processNode(conditionalType.getTrueType()),
        "falseType": processNode(conditionalType.getFalseType()),
    };
};

const processConstructorDeclaration = (constructor: ConstructorDeclaration): any => {
    return {
        "kind": constructor.getKindName(),
        "typeParameters": constructor.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": constructor.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(constructor.getReturnTypeNode()),
    };
};

const processConstructorType = (constructorType: ConstructorTypeNode): any => {
    return {
        "kind": constructorType.getKindName(),
        "modifiers": constructorType.getModifiers().map(processNode).filter((node) => node != null),
        "typeParameters": constructorType.compilerNode.typeParameters?.map((n) => processNode(createWrappedNode(n))).filter((node) => node != null),
        "parameters": constructorType.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(constructorType.getReturnTypeNode()),
    };
};

const processConstructSignature = (constructSignature: ConstructSignatureDeclaration): any => {
    return {
        "kind": constructSignature.getKindName(),
        "typeParameters": constructSignature.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": constructSignature.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(constructSignature.getReturnTypeNode()),
    };
};


const processEnumDeclaration = (enumDeclaration: EnumDeclaration): any => {
    return {
        "kind": enumDeclaration.getKindName(),
        "modifiers": enumDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(enumDeclaration.getNameNode()),
        "members": enumDeclaration.getMembers().map(processNode).filter((node) => node != null),
    };
};

const processEnumMember = (enumMember: EnumMember): any => {
    return {
        "kind": enumMember.getKindName(),
        "name": processNode(enumMember.getNameNode()),
        "initializer": processNode(enumMember.getInitializer()),
    };
};

const processExpressionWithTypeArguments = (expressionWithTypeArguments: ExpressionWithTypeArguments): any => {
    return {
        "kind": expressionWithTypeArguments.getKindName(),
        "expression": processNode(expressionWithTypeArguments.getExpression()),
        "typeArguments": expressionWithTypeArguments.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};

const processFalseKeyword = (falseKeyword: Node): any => {
    return {
        "kind": falseKeyword.getKindName(),
    };
};

const processFunctionDeclaration = (functionDeclaration: FunctionDeclaration): any => {
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

const processFunctionType = (functionType: FunctionTypeNode): any => {
    return {
        "kind": functionType.getKindName(),
        "typeParameters": functionType.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": functionType.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(functionType.getReturnTypeNode()),
    };
};

const processGetAccessor = (getAccessor: GetAccessorDeclaration): any => {
    return {
        "kind": getAccessor.getKindName(),
        "modifiers": getAccessor.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(getAccessor.getNameNode()),
        "typeParameters": getAccessor.getTypeParameters().map(processNode).filter((node) => node != null),
        "type": processNode(getAccessor.getReturnTypeNode()),
    };
};

const processHeritageClause = (heritageClause: HeritageClause): any => {
    return {
        "kind": heritageClause.getKindName(),
        "token": {
            "kind": heritageClause.getToken() == SyntaxKind.ExtendsKeyword ? "ExtendsKeyword" : "ImplementsKeyword",
        },
        "types": heritageClause.getTypeNodes().map(processNode).filter((node) => node != null),
    };
};

const processIdentifier = (identifier: Identifier): any => {
    return {
        "kind": identifier.getKindName(),
        "text": identifier.getText(),
    };
}

const processImportAttribute = (importAttribute: ImportAttribute): any => {
    return {
        "kind": importAttribute.getKindName(),
        "name": processNode(importAttribute.getNameNode()),
        "value": processNode(importAttribute.getValue()),
    };
};

const processImportAttributes = (importAttributes: ImportAttributes): any => {
    return {
        "kind": importAttributes.getKindName(),
        "elements": importAttributes.getElements().map(processNode).filter((node) => node != null),
    };
};

const processImportClause = (importClause: ImportClause): any => {
    return {
        "kind": importClause.getKindName(),
        "isTypeOnly": importClause.compilerNode.isTypeOnly,
        "name": importClause.compilerNode.name ? processNode(createWrappedNode(importClause.compilerNode.name)) : undefined,
        "namedBindings": processNode(importClause.getNamedBindings()),
    };
};

const processImportDeclaration = (importDeclaration: ImportDeclaration): any => {
    return {
        "kind": importDeclaration.getKindName(),
        "modifiers": importDeclaration.compilerNode.modifiers?.map((n) => processNode(createWrappedNode(n))).filter((node) => node != null),
        "importClause": processNode(importDeclaration.getImportClause()),
        "moduleSpecifier": processNode(importDeclaration.getModuleSpecifier()),
        "importAttributes": processNode(importDeclaration.getAttributes()),
    };
}

const processImportSpecifier = (importSpecifier: ImportSpecifier): any => {
    return {
        "kind": importSpecifier.getKindName(),
        "isTypeOnly": importSpecifier.compilerNode.isTypeOnly,
        "name": processNode(importSpecifier.getNameNode()),
        "propertyName": importSpecifier.compilerNode.propertyName ? processNode(createWrappedNode(importSpecifier.compilerNode.propertyName)) : undefined,
    };
};

const processImportType = (importType: ImportTypeNode): any => {
    return {
        "kind": importType.getKindName(),
        "argument": processNode(importType.getArgument()),
        "attributes": processNode(importType.getAttributes()),
        "qualifier": processNode(importType.getQualifier()),
        "typeArguments": importType.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};

const processIndexedAccessType = (indexedAccessType: IndexedAccessTypeNode): any => {
    return {
        "kind": indexedAccessType.getKindName(),
        "objectType": processNode(indexedAccessType.getObjectTypeNode()),
        "indexType": processNode(indexedAccessType.getIndexTypeNode()),
    };
};

const processIndexSignature = (indexSignature: IndexSignatureDeclaration): any => {
    return {
        "kind": indexSignature.getKindName(),
        "modifiers": indexSignature.getModifiers().map(processNode).filter((node) => node != null),
        "parameters": indexSignature.compilerNode.parameters.map((p) => processNode(createWrappedNode(p))).filter((node) => node != null),
        "type": processNode(indexSignature.getReturnTypeNode()),
    };
};

const processInferType = (inferType: InferTypeNode): any => {
    return {
        "kind": inferType.getKindName(),
        "typeParameter": processNode(inferType.getTypeParameter()),
    };
};

const processInterfaceDeclaration = (interfaceDeclaration: InterfaceDeclaration): any => {
    return {
        "kind": interfaceDeclaration.getKindName(),
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
        "types": intersectionType.getTypeNodes().map(processNode).filter((node) => node != null),
    };
};

const processLiteralType = (literalType: LiteralTypeNode): any => {
    return {
        "kind": literalType.getKindName(),
        "literal": processNode(literalType.getLiteral()),
    };
};

const processMappedType = (mappedType: MappedTypeNode): any => {
    return {
        "kind": mappedType.getKindName(),
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
        "name": processNode(methodSignature.getNameNode()),
        "questionToken": processNode(methodSignature.getQuestionTokenNode()),
        "typeParameters": methodSignature.getTypeParameters().map(processNode).filter((node) => node != null),
        "parameters": methodSignature.getParameters().map(processNode).filter((node) => node != null),
        "type": processNode(methodSignature.getReturnTypeNode())
    };
};

const processModifier = (modifier: Node): any => {
    return {
        "kind": modifier.getKindName(),
    };
};

const processModuleBlock = (moduleBlock: ModuleBlock): any => {
    return {
        "kind": moduleBlock.getKindName(),
        "statements": moduleBlock.getStatements().map(processNode).filter((node) => node != null),
    };
};

const processModuleDeclaration = (moduleDeclaration: ModuleDeclaration): any => {
    return {
        "kind": moduleDeclaration.getKindName(),
        "modifiers": moduleDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(moduleDeclaration.getNameNode()),
        "body": processNode(moduleDeclaration.getBody()),
    };
};

const processNamedImports = (namedImports: NamedImports): any => {
    return {
        "kind": namedImports.getKindName(),
        "elements": namedImports.getElements().map(processNode).filter((node) => node != null),
    };
};

const processNamespaceImport = (namespaceImport: NamespaceImport): any => {
    return {
        "kind": namespaceImport.getKindName(),
        "name": processNode(namespaceImport.getNameNode()),
    };
};

const processNeverKeyword = (neverKeyword: Node): any => {
    return {
        "kind": neverKeyword.getKindName(),
    };
};

const processNullKeyword = (nullKeyword: Node): any => {
    return {
        "kind": nullKeyword.getKindName(),
    };
};

const processNumberKeyword = (numberKeyword: Node): any => {
    return {
        "kind": numberKeyword.getKindName(),
    };
};

const processNumericLiteral = (numericLiteral: NumericLiteral): any => {
    return {
        "kind": numericLiteral.getKindName(),
        "text": numericLiteral.getText(),
    };
};

const processObjectKeyword = (objectKeyword: Node): any => {
    return {
        "kind": objectKeyword.getKindName(),
    };
};

const processParameter = (parameter: ParameterDeclaration): any => {
    return {
        "kind": parameter.getKindName(),
        "modifiers": parameter.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(parameter.getNameNode()),
        "questionToken": processNode(parameter.getQuestionTokenNode()),
        "type": processNode(parameter.getTypeNode()),
        "initializer": processNode(parameter.getInitializer()),
    };
};

const processParenthesizedType = (parenthesizedType: ParenthesizedTypeNode): any => {
    return {
        "kind": parenthesizedType.getKindName(),
        "type": processNode(parenthesizedType.getTypeNode()),
    };
};

const processPrefixUnaryExpression = (prefixUnaryExpression: PrefixUnaryExpression): any => {
    return {
        "kind": prefixUnaryExpression.getKindName(),
        "operator": {
            "kind": SyntaxKind[prefixUnaryExpression.getOperatorToken().toString()]
        },
        "operand": processNode(prefixUnaryExpression.getOperand()),
    };
};

const processPropertyAccessExpression = (propertyAccessExpression: PropertyAccessExpression): any => {
    return {
        "kind": propertyAccessExpression.getKindName(),
        "expression": processNode(propertyAccessExpression.getExpression()),
        "questionDotToken": processNode(propertyAccessExpression.getQuestionDotTokenNode()),
        "name": processNode(propertyAccessExpression.getNameNode()),
    };
};

const processPropertyDeclaration = (propertyDeclaration: PropertyDeclaration): any => {
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

const processPropertySignature = (propertySignature: PropertySignature): any => {
    return {
        "kind": propertySignature.getKindName(),
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
        "left": processNode(qualifiedName.getLeft()),
        "right": processNode(qualifiedName.getRight()),
    };
};

const processQuestionToken = (questionToken: Node): any => {
    return {
        "kind": questionToken.getKindName(),
    };
};

const processRestType = (restType: RestTypeNode): any => {
    return {
        "kind": restType.getKindName(),
        "type": processNode(restType.getTypeNode()),
    };
};

const processSetAccessor = (setAccessor: SetAccessorDeclaration): any => {
    return {
        "kind": setAccessor.getKindName(),
        "modifiers": setAccessor.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(setAccessor.getNameNode()),
        "typeParameters": setAccessor.getTypeParameters().map(processNode).filter((node) => node != null),
        "type": processNode(setAccessor.getReturnTypeNode()),
    };
};

const processSourceFile = (sourceFile: SourceFile): any => {
    return {
        "kind": sourceFile.getKindName(),
        "baseName": sourceFile.getBaseName(),
        "statements": sourceFile.getStatements().map(processNode).filter((node) => node != null)
    };
};

const processStringKeyword = (stringKeyword: Node): any => {
    return {
        "kind": stringKeyword.getKindName(),
    };
};

const processStringLiteral = (stringLiteral: Node): any => {
    return {
        "kind": stringLiteral.getKindName(),
        "text": stringLiteral.getText(),
    };
};

const processSymbolKeyword = (symbolKeyword: Node): any => {
    return {
        "kind": symbolKeyword.getKindName(),
    };
};

const processThisType = (thisType: ThisTypeNode): any => {
    return {
        "kind": thisType.getKindName(),
    };
};

const processTrueKeyword = (trueKeyword: Node): any => {
    return {
        "kind": trueKeyword.getKindName(),
    };
};

const processTupleType = (tupleType: TupleTypeNode): any => {
    return {
        "kind": tupleType.getKindName(),
        "elements": tupleType.getElements().map(processNode).filter((node) => node != null),
    };
};

const processTypeAliasDeclaration = (typeAliasDeclaration: TypeAliasDeclaration): any => {
    return {
        "kind": typeAliasDeclaration.getKindName(),
        "modifiers": typeAliasDeclaration.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(typeAliasDeclaration.getNameNode()),
        "typeParameters": typeAliasDeclaration.getTypeParameters().map(processNode).filter((node) => node != null),
        "type": processNode(typeAliasDeclaration.getTypeNode()),
    };
};

const processTypeLiteral = (typeLiteral: TypeLiteralNode): any => {
    return {
        "kind": typeLiteral.getKindName(),
        "members": typeLiteral.getMembers().map(processNode).filter((node) => node != null),
    };
}

const processTypeOperator = (typeOperator: TypeOperatorTypeNode): any => {
    return {
        "kind": typeOperator.getKindName(),
        "operator": {
            "kind": SyntaxKind[typeOperator.getOperator().toString()]
        },
        "type": processNode(typeOperator.getTypeNode()),
    };
};

const processTypeParameter = (typeParameter: TypeParameterDeclaration): any => {
    return {
        "kind": typeParameter.getKindName(),
        "modifiers": typeParameter.getModifiers().map(processNode).filter((node) => node != null),
        "name": processNode(typeParameter.getNameNode()),
        "constraint": processNode(typeParameter.getConstraint()),
        "default": processNode(typeParameter.getDefault()),
    };
};

const processTypePredicate = (typePredicate: TypePredicateNode): any => {
    return {
        "kind": typePredicate.getKindName(),
        "assertsModifier": processNode(typePredicate.getAssertsModifier()),
        "parameterName": processNode(typePredicate.getParameterNameNode()),
        "type": processNode(typePredicate.getTypeNode()),
    };
};

const processTypeQuery = (typeQuery: TypeQueryNode): any => {
    return {
        "kind": typeQuery.getKindName(),
        "exprName": processNode(typeQuery.getExprName()),
        "typeArguments": typeQuery.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};

const processTypeReference = (typeReference: TypeReferenceNode): any => {
    return {
        "kind": typeReference.getKindName(),
        "typeName": processNode(typeReference.getTypeName()),
        "typeArguments": typeReference.getTypeArguments().map(processNode).filter((node) => node != null),
    };
};

const processUndefinedKeyword = (undefinedKeyword: Node): any => {
    return {
        "kind": undefinedKeyword.getKindName(),
    };
};

const processUnionType = (unionType: UnionTypeNode): any => {
    return {
        "kind": unionType.getKindName(),
        "types": unionType.getTypeNodes().map(processNode).filter((node) => node != null),
    };
};

const processUnknownKeyword = (unknownKeyword: Node): any => {
    return {
        "kind": unknownKeyword.getKindName(),
    };
};

const processVariableDeclaration = (variableDeclaration: VariableDeclaration): any => {
    return {
        "kind": variableDeclaration.getKindName(),
        "name": processNode(variableDeclaration.getNameNode()),
        "exclamationToken": processNode(variableDeclaration.getExclamationTokenNode()),
        "type": processNode(variableDeclaration.getTypeNode()),
        "initializer": processNode(variableDeclaration.getInitializer()),
    };
};

const processVariableDeclarationList = (variableDeclarationList: VariableDeclarationList): any => {
    return {
        "kind": variableDeclarationList.getKindName(),
        "declarations": variableDeclarationList.getDeclarations().map(processNode).filter((node) => node != null),
    };
};

const processVariableStatement = (variableStatement: VariableStatement): any => {
    return {
        "kind": variableStatement.getKindName(),
        "modifiers": variableStatement.getModifiers().map(processNode).filter((node) => node != null),
        "declarationList": processNode(variableStatement.getDeclarationList()),
    };
};

const processVoidKeyword = (voidKeyword: Node): any => {
    return {
        "kind": voidKeyword.getKindName(),
    };
}

const processNode = (node?: Node): any => {
    if (node == undefined || node == null) {
        return null;
    } else if (isAnyKeyword(node)) {
        return processAnyKeyword(node);
    } else if (isArrayType(node)) {
        return processArrayType(node);
    } else if (isBooleanKeyword(node)) {
        return processBooleanKeyword(node);
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
        return null;
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
    } else if (isLiteralType(node)) {
        return processLiteralType(node);
    } else if (isMappedType(node)) {
        return processMappedType(node);
    } else if (isMethodDeclaration(node)) {
        return processMethodDeclaration(node);
    } else if (isMethodSignature(node)) {
        return processMethodSignature(node);
    } else if (isModifier(node)) {
        return processModifier(node);
    } else if (isModuleBlock(node)) {
        return processModuleBlock(node);
    } else if (isModuleDeclaration(node)) {
        return processModuleDeclaration(node);
    } else if (isNamedImports(node)) {
        return processNamedImports(node);
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

function parse(directory: string): any {
    const project = new Project({
        compilerOptions: {
            target: ScriptTarget.ESNext,
        },
        skipAddingFilesFromTsConfig: true
    });
    project.addSourceFilesAtPaths(directory + "/**/*.d.ts");

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

export { parse };
