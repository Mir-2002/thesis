import ast

def parse_python_file(file_content):
    tree = ast.parse(file_content)
    parsed_data = []

    for node in ast.walk(tree):
        if isinstance(node, (ast.FunctionDef, ast.ClassDef)):
            docstring = ast.get_docstring(node)
            parsed_data.append({
                "type": "function" if isinstance(node, ast.FunctionDef) else "class",
                "name": node.name,
                "docstring": docstring if docstring else ""
            })

    return parsed_data