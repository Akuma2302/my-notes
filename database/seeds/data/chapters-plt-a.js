/* Programming Language Translation (TCS3311 Compiler Design), topics 1-6.
   The lecture slides were not received, so notes are written from standard compiler-design
   material matching each tutorial's topic. Tutorial questions are from Tutorial-NN-t31213.doc. */
const NOTE = '<p class="tip"><b>About these notes:</b> written from standard compiler-design material for this tutorial topic, because the lecture slides were not in your files. Check them against your lecturer’s slides when you get them.</p>';

const chapters = [
{
  id: 'plt1', subject: 'plt', num: 1, theme: 'front', title: 'Introduction to compiler design', short: 'Intro to compilers',
  lecture: 'Tutorial-01 topic: Introduction to Compiler Design',
  summary: 'What compilers, interpreters and assemblers do, compiled vs interpreted languages, the six phases of compilation and their inputs and outputs, why intermediate code exists, the symbol table and error handler, preprocessing and linking, and Java bytecode.',
  sections: [
    { h: 'Compiler, interpreter, assembler', pics: [{ cards: [{ t: 'Compiler', s: 'Whole program → target code, run later', c: 'p' }, { t: 'Interpreter', s: 'Executes statements directly', c: 't' }, { t: 'Assembler', s: 'Assembly → machine code', c: 'c' }], cols: 3, title: 'Three translators' }], body: NOTE + `
      <ul><li><b>Compiler</b>: translates the whole source program into a target program (machine code or bytecode) <i>before</i> it runs. Errors are reported for the whole program.</li>
      <li><b>Interpreter</b>: reads and executes the program statement by statement; no separate target program.</li>
      <li><b>Assembler</b>: translates assembly language (mnemonics like MOV, ADD) into machine code, roughly one instruction each.</li></ul>
      <p><b>Compiled</b>: faster execution, errors caught early, harder to inspect source; but slower edit-run cycle and platform-specific output. <b>Interpreted</b>: portable, quick to test and debug; but slower and errors appear only when the line runs. Many modern languages mix both (Java: compile to bytecode, then JIT).</p>` },
    { h: 'Phases of compilation', pics: [{ flow: [['Lexical analysis', 'characters → tokens'], ['Syntax analysis', 'tokens → parse tree'], ['Semantic analysis', 'types, scopes → annotated tree'], ['Intermediate code generation', 'tree → three-address code'], ['Code optimisation', 'better IR'], ['Code generation', 'IR → target code']], colors: ['p', 'p', 't', 't', 'c', 'c'], title: 'Six phases' }], body: `
      <p><b>Front end</b> (analysis, depends on the source language): lexical, syntax, semantic. <b>Back end</b> (synthesis, depends on the target machine): optimisation and code generation. Intermediate code connects them.</p>
      <p><b>Symbol table</b>: data structure holding every identifier with its attributes (type, scope, memory location); used by all phases. <b>Error handler</b>: detects, reports and recovers from errors in every phase so compilation can continue and report more errors.</p>` },
    { h: 'Why intermediate code?', body: `
      <ul><li><b>Retargeting</b>: one front end + many back ends (M languages × N machines needs M + N parts, not M × N).</li>
      <li><b>Machine-independent optimisation</b> can be done once on the IR.</li>
      <li>Easier to generate and simpler than full machine code.</li></ul>` },
    { h: 'Preprocessor, assembler, linker, loader', pics: [{ flow: [['Preprocessor', 'Macros, #include'], ['Compiler'], ['Assembler'], ['Linker', 'Join object files, libraries'], ['Loader', 'Into memory, run']], dir: 'h', color: 'x', title: 'Language processing system' }], body: `
      <p><b>Preprocessing</b> (before compiling): expands macros, includes header files, removes comments, handles conditional compilation (<code>#ifdef</code>). <b>Linking</b> (after): combines object files and libraries, resolves external references to functions defined elsewhere, and produces one executable.</p>` },
    { h: 'Java bytecode', body: `
      <p><code>javac</code> compiles Java into <b>bytecode</b> (<code>.class</code>) for the Java Virtual Machine, a stack machine. The JVM interprets it and its JIT compiles hot code to machine code. Example for <code>int c = a + b;</code>:</p>
      <pre><code>iload_1      // push a
iload_2      // push b
iadd         // pop two, push a+b
istore_3     // pop into c</code></pre>
      <p>See it yourself with <code>javap -c MyClass</code>.</p>` }
  ],
  links: [
    { to: 'plt3', topic: 'Lexical analysis', text: 'Phase 1 in detail.' },
    { to: 'plt10', topic: 'Intermediate code', text: 'Why and how IR is generated.' },
    { to: 'ch1', topic: 'Coding errors', text: 'Software QA Ch 1 lists coding errors as a cause of software errors; compilers catch many of them.' }
  ],
  mindmaps: [{ center: 'Compilers', branches: [
    { label: 'Translators', color: 'p', kids: ['Compiler: all at once', 'Interpreter: line by line', 'Assembler: mnemonics'] },
    { label: 'Front end', color: 'p', kids: ['Lexical → tokens', 'Syntax → parse tree', 'Semantic → types'] },
    { label: 'Back end', color: 'c', kids: ['Intermediate code', 'Optimisation', 'Code generation'] },
    { label: 'Helpers', color: 't', kids: ['Symbol table', 'Error handler'] },
    { label: 'Toolchain', color: 'x', kids: ['Preprocessor', 'Assembler, linker', 'Loader'] },
    { label: 'Examples', color: 'a', kids: ['Java bytecode + JIT', 'CPython bytecode', 'Hybrid approaches'] }
  ] }],
  cases: [
    { co: 'Java / JVM', logo: 'JV', color: 'p', year: '1995→', title: 'Compile once, run anywhere', story: 'javac produces bytecode; the JVM interprets it and the HotSpot JIT compiles frequently used methods to native code at run time.', lesson: 'Intermediate code gives portability; JIT gives speed.' },
    { co: 'CPython', logo: 'PY', color: 't', year: 'ongoing', title: 'Python is compiled too', story: 'CPython compiles source to bytecode (.pyc files) and then interprets that bytecode. You can view it with the dis module.', lesson: 'The line between compiler and interpreter is blurry.' },
    { co: 'Google V8', logo: 'V8', color: 'c', year: '2008→', title: 'JavaScript engine', story: 'V8 (Chrome, Node.js) parses JavaScript, runs it with the Ignition interpreter and optimises hot code with the TurboFan compiler.', lesson: 'Modern engines combine interpretation and compilation.' }
  ],
  code: [
    { title: 'See Python’s bytecode', lang: 'Python', explain: 'The dis module shows the bytecode CPython’s compiler produced, much like javap -c for Java.', src: String.raw`import dis

def add(a, b):
    c = a + b
    return c

dis.dis(add)
# LOAD_FAST a, LOAD_FAST b, BINARY_OP (+), STORE_FAST c, LOAD_FAST c, RETURN_VALUE` }
  ],
  beyond: [
    { skill: 'dsa', why: 'Compilers are built from data structures: hash tables (symbol table), trees (parse trees), graphs (flow graphs, DAGs).' },
    { skill: 'frameworks', why: 'TypeScript, Babel and bundlers are compilers for the web.' },
    { skill: 'devops', why: 'Build pipelines run compilers, linkers and packagers automatically.' }
  ],
  cards: [
    ['Compiler vs interpreter', 'Compiler translates the whole program before running; interpreter executes statement by statement.'],
    ['Six phases of compilation', 'Lexical, syntax, semantic, intermediate code generation, optimisation, code generation.'],
    ['Front end vs back end', 'Front: analysis, source-dependent. Back: synthesis, machine-dependent.'],
    ['Role of the symbol table', 'Stores identifiers and their attributes (type, scope, location) for all phases.'],
    ['Why intermediate code?', 'Retargeting, machine-independent optimisation, simpler to generate.'],
    ['Linker', 'Combines object files and libraries and resolves external references.']
  ],
  quiz: [
    { q: 'Which phase turns characters into tokens?', o: ['Syntax analysis', 'Lexical analysis', 'Semantic analysis', 'Code generation'], a: 1, why: 'The scanner (lexical analyser).' },
    { q: 'Type checking happens in…', o: ['Lexical analysis', 'Syntax analysis', 'Semantic analysis', 'Linking'], a: 2, why: 'Semantic analysis checks types and scopes.' },
    { q: 'Expanding #include happens in the…', o: ['Preprocessor', 'Linker', 'Loader', 'Optimiser'], a: 0, why: 'Before compilation.' }
  ],
  tutorial: { no: 1, source: 'Tutorial-01-t31213.doc', intro: '<p>Discussion questions with model answers. The practical (Visual Studio parser) and assignment (design your own language) are listed at the end.</p>', items: [
    { n: 'D1', q: 'What is the difference between a compiler, an interpreter and an assembler?', a: `<ul><li><b>Compiler</b>: translates a whole high-level program into target code before execution.</li><li><b>Interpreter</b>: executes the source (or an IR) directly, statement by statement.</li><li><b>Assembler</b>: translates assembly language into machine code (low-level to machine level).</li></ul>` },
    { n: 'D2', q: 'Advantages and disadvantages of a compiled language compared to an interpreted language?', a: `<p><b>Compiled</b> + faster execution, whole-program error checking, optimisation, source not needed to run. − slower edit-compile-run cycle, output is platform-specific.</p><p><b>Interpreted</b> + portable, quick to try and debug, flexible (dynamic features). − slower, errors found only when that line runs, interpreter must be installed.</p>` },
    { n: 'D3', q: 'Describe the inputs and outputs of the different phases.', a: `<table><tr><th>Phase</th><th>Input</th><th>Output</th></tr><tr><td>Lexical</td><td>Characters</td><td>Tokens</td></tr><tr><td>Syntax</td><td>Tokens</td><td>Parse tree</td></tr><tr><td>Semantic</td><td>Parse tree</td><td>Annotated tree</td></tr><tr><td>Intermediate code</td><td>Annotated tree</td><td>Three-address code</td></tr><tr><td>Optimisation</td><td>IR</td><td>Improved IR</td></tr><tr><td>Code generation</td><td>IR</td><td>Target code</td></tr></table>` },
    { n: 'D4', q: 'Why do some compilers generate intermediate code instead of machine code?', a: `<p>Retargeting (one front end for many machines), machine-independent optimisation on the IR, portability (e.g. JVM bytecode runs anywhere), and IR is easier to generate than machine code.</p>` },
    { n: 'D5', q: 'Describe the typical components of a compiler.', a: `<p>Scanner (lexical analyser), parser (syntax analyser), semantic analyser, intermediate code generator, code optimiser, code generator, plus the symbol table manager and error handler used by all.</p>` },
    { n: 'D6', q: 'Roles of the symbol table and error handler?', a: `<p><b>Symbol table</b>: records each identifier and its attributes (name, type, scope, size, address); inserted by early phases, looked up by later ones. <b>Error handler</b>: detects errors in each phase, reports them with location, and recovers so the compiler can continue (e.g. skip to the next semicolon).</p>` },
    { n: 'D7', q: 'Explain preprocessing (before compilation) and linking (after).', a: `<p><b>Preprocessing</b>: macro expansion, file inclusion (#include), conditional compilation, comment removal. <b>Linking</b>: combines object files and libraries into one executable and resolves references to functions and variables defined in other files.</p>` },
    { n: 'D8', q: 'Describe with an example the Java bytecode generated from a Java program.', a: `<pre><code>int a = 2, b = 3; int c = a + b;
iconst_2  istore_1     // a = 2
iconst_3  istore_2     // b = 3
iload_1   iload_2  iadd  istore_3   // c = a + b</code></pre><p>The JVM is a stack machine: operands are pushed, iadd pops two and pushes the sum.</p>` },
    { n: 'P1', kind: 'practical', q: 'Practical 1–2 and exercises: observe Visual Studio compiling; write "My First Parser" that lists characters; count letters, letter frequencies and words.', a: `<p>Idea in Python (same logic as the VB exercise):</p><pre><code>s = "Hello World 2026"
print(sum(ch.isalpha() for ch in s))        # 1. count letters
from collections import Counter
print(Counter(ch.lower() for ch in s if ch.isalpha()))   # 2. frequency
import re; print(re.findall(r"[A-Za-z]+", s))            # 3. words</code></pre>` },
    { n: 'A1', kind: 'assignment', q: 'Assignment: define keywords (max 4 chars, prefix/suffix special char from ^ $ & %), an end-of-statement symbol, and write a first program with title and programmer statements.', a: `<p>Example design (yours must be your own): prefix <code>%</code>, end symbol <code>!</code>.</p><pre><code>%tit "My Language"!
%who "Aina"!
%out "Hello World"!</code></pre><p>Exercise: a program that reads this file and prints the keywords is your first lexical analyser (see Ch 3–4 code).</p>` }
  ] }
},
{
  id: 'plt2', subject: 'plt', num: 2, theme: 'front', title: 'Programming language specification', short: 'Language specification',
  lecture: 'Tutorial-02 topic: Programming Language Specification',
  summary: 'Why languages need precise specification, syntax vs semantics, formal grammars G = (N, T, P, S), BNF and EBNF, deriving sample programs from a grammar, and examples of semantic rules in Java and C++.',
  sections: [
    { h: 'Why specify precisely?', body: NOTE + `
      <p>A precise specification means every compiler for the language accepts the same programs and gives them the same meaning, programmers know exactly what is legal, and compiler writers can build each phase from the spec: <b>regular expressions</b> specify tokens (lexer), <b>grammars</b> specify syntax (parser), <b>semantic rules</b> specify meaning (type checker).</p>` },
    { h: 'Formal grammar', pics: [{ cards: [{ t: 'N', s: 'Non-terminals: <expr>, <stmt>', c: 'p' }, { t: 'T', s: 'Terminals: tokens like id, +, if', c: 't' }, { t: 'P', s: 'Production rules A → α', c: 'c' }, { t: 'S', s: 'Start symbol', c: 'a' }], cols: 2, title: 'G = (N, T, P, S)' }], body: `
      <p>A grammar is a 4-tuple <b>G = (N, T, P, S)</b>. A <b>derivation</b> starts at S and repeatedly replaces a non-terminal using a production until only terminals remain. The <b>language L(G)</b> is all terminal strings that can be derived.</p>` },
    { h: 'BNF and EBNF', pics: [{ compare: { a: { title: 'BNF', color: 'p', items: ['<list> ::= <list> , id | id', 'Recursion for repetition', 'Alternatives with |'] }, b: { title: 'EBNF', color: 't', items: ['list → id { , id }', '{ } = zero or more', '[ ] = optional, ( ) = grouping'] } }, title: 'BNF vs EBNF' }], body: `
      <p>BNF (Backus–Naur Form) was introduced for ALGOL 60. EBNF adds repetition and optional parts so grammars are shorter and easier to turn into parsers.</p>` },
    { h: 'Syntax vs semantics', body: `
      <p><b>Syntax</b>: the form of programs (grammar). <b>Semantics</b>: the meaning. Some rules can't be written in a context-free grammar, so they are <b>semantic rules</b> checked later:</p>
      <ul><li>Variables must be declared before use (Java, C++).</li><li>Operand types must be compatible (<code>int x = "hi";</code> is an error in Java).</li><li>A method call must match the declared number and types of parameters.</li><li>No duplicate declarations in the same scope.</li><li>Java: a non-void method must return a value on every path; <code>break</code> only inside loops/switch.</li><li>C++: <code>const</code> objects can't be modified.</li></ul>` }
  ],
  links: [
    { to: 'plt5', topic: 'Grammars and derivations', text: 'Topic 5 uses grammars to build parse trees.' },
    { to: 'plt9', topic: 'Semantic rules', text: 'Topic 9 implements the semantic rules (scopes, types).' },
    { to: 'ch5', topic: 'Formal specification', text: 'Software QA Ch 5: formal specs force detailed analysis and help reliability.' }
  ],
  mindmaps: [{ center: 'Specification', branches: [
    { label: 'Why', color: 'p', kids: ['Same meaning everywhere', 'Build each phase from spec'] },
    { label: 'Grammar', color: 'p', kids: ['N, T, P, S', 'Derivation', 'Language L(G)'] },
    { label: 'Notations', color: 't', kids: ['BNF ::= and |', 'EBNF { } [ ]'] },
    { label: 'Semantics', color: 'c', kids: ['Declare before use', 'Type compatibility', 'No duplicates in scope'] }
  ] }],
  cases: [
    { co: 'ALGOL 60', logo: 'AL', color: 'p', year: '1960', title: 'Where BNF came from', story: 'The ALGOL 60 report used John Backus’s notation, refined by Peter Naur, to define the language’s syntax precisely. It became the standard way to write grammars.', lesson: 'Formal grammars made language definitions unambiguous.' },
    { co: 'JSON', logo: '{ }', color: 't', year: '2001→', title: 'A tiny, precise grammar', story: 'JSON is specified by a short grammar (shown as railroad diagrams on json.org and in RFC 8259), which is why parsers in every language agree.', lesson: 'A precise spec gives interoperability.' }
  ],
  code: [
    { title: 'Generate random programs from a grammar', lang: 'Python', explain: 'Produces sample sentences from the Tutorial 2 grammar by expanding non-terminals at random.', src: String.raw`import random

G = {
    "program": [["class", "id", "{", "members", "}"]],
    "members": [["decls", "method"]],
    "decls": [["decls", "decl"], ["decl"]],
    "decl": [["type", "id", ";"]],
    "method": [["modifier", "id", "(", ")", "{", "stmts", "}"]],
    "stmts": [["stmts", "stmt"], ["stmt"]],
    "stmt": [["id", "=", "id", "op", "id", ";"], ["print", "id", ";"]],
    "type": [["integer"], ["float"], ["string"]],
    "modifier": [["public"], ["private"]],
    "op": [["+"], ["-"]],
    "id": [["a"], ["b"], ["c"]],
}

def gen(sym, depth=0):
    if sym not in G:
        return [sym]
    rules = G[sym] if depth < 4 else [min(G[sym], key=len)]   # stop recursion
    return [t for s in random.choice(rules) for t in gen(s, depth + 1)]

print(" ".join(gen("program")))` }
  ],
  beyond: [
    { skill: 'docs', why: 'API specs (OpenAPI) and data formats are written with the same precision as grammars.' },
    { skill: 'testing', why: 'Grammar-based fuzzing generates random valid inputs to test parsers and APIs.' }
  ],
  cards: [
    ['Grammar 4-tuple', 'G = (N, T, P, S): non-terminals, terminals, productions, start symbol.'],
    ['BNF vs EBNF', 'EBNF adds { } repetition, [ ] optional and ( ) grouping.'],
    ['Syntax vs semantics', 'Syntax: form (grammar). Semantics: meaning (types, scopes).'],
    ['Example semantic rule', 'Variables must be declared before use; types must be compatible.']
  ],
  quiz: [
    { q: 'In G = (N, T, P, S), tokens like "if" and "+" belong to…', o: ['N', 'T', 'P', 'S'], a: 1, why: 'Terminals.' },
    { q: '“Variable used before declaration” is a…', o: ['Lexical error', 'Syntax error', 'Semantic error', 'Linker error'], a: 2, why: 'Context-free grammars can’t express it.' },
    { q: 'In EBNF, { , id } means…', o: ['Exactly one', 'Optional once', 'Zero or more times', 'One or more'], a: 2, why: 'Braces mean repetition.' }
  ],
  tutorial: { no: 2, source: 'Tutorial-02-t31213.doc', items: [
    { n: 'D1', q: 'Discuss the importance of specifying programming languages clearly and precisely.', a: `<p>Ensures all compilers accept the same programs with the same meaning (portability); programmers know exactly what is legal; compiler phases can be built and tested directly from the spec; removes ambiguity that causes bugs.</p>` },
    { n: 'D2', q: 'How can we specify the inputs and outputs of each phase, and use them to write the compiler?', a: `<p>Tokens: <b>regular expressions</b> → build the scanner (DFA). Syntax: <b>context-free grammar</b> → build the parser (recursive descent / LR). Meaning: <b>semantic rules / attribute grammar</b> → type checker and translator. IR and target: <b>instruction formats</b> → code generator. Each spec is the contract between phases.</p>` },
    { n: 'D3', q: 'What is the formal description of a grammar?', a: `<p>G = (N, T, P, S): N non-terminals, T terminals, P productions of the form A → α (A ∈ N, α a string of N ∪ T), S ∈ N the start symbol.</p>` },
    { n: 'D4', q: 'Write sample programs derivable from the given grammar.', a: `<p>Note: <code>&lt;members&gt;</code> has data members followed by exactly <b>one</b> method, and identifiers are only a, b, c.</p><pre><code>class a { integer b; public c() { b = a + c; print b; } }

class b { float a; string c; private a() { print c; c = a - b; } }</code></pre>` },
    { n: 'D5', q: 'Give examples of semantic rules for Java and C++.', a: `<ul><li>Declare before use; no redeclaration in the same scope.</li><li>Type compatibility in assignments and expressions (Java forbids <code>int x = 3.5;</code> without a cast).</li><li>Method calls match parameter count and types.</li><li>Java: non-void methods return on all paths; <code>break</code> only in loops or switch; final variables assigned once.</li><li>C++: const objects can't be modified; overload resolution must be unambiguous.</li></ul>` },
    { n: 'P1', kind: 'practical', q: 'Practical: Expression Parser. Exercises: ignore extra spaces, evaluate, show errors, accept 3 operands and 2 operators.', a: `<pre><code>import re
def evaluate(text):
    tokens = re.findall(r"\\d+|[+\\-*/]|\\S", text)        # skips any spaces
    if not tokens or len(tokens) % 2 == 0:
        raise ValueError("expression must be: number op number ...")
    value = int(tokens[0])
    for op, num in zip(tokens[1::2], tokens[2::2]):
        if not num.isdigit() or op not in "+-*/":
            raise ValueError(f"invalid token near {op} {num}")
        value = {"+": value + int(num), "-": value - int(num),
                 "*": value * int(num), "/": value / int(num)}[op]
    return value                     # left to right, like the exercise
print(evaluate("3 +  4   * 2"))      # 14</code></pre>` },
    { n: 'A1', kind: 'assignment', q: 'Assignment: postfix expressions, an assignment keyword, 10 variables, an input keyword, data type keywords and declarations.', a: `<p>Example design using prefix <code>%</code> and end <code>!</code>:</p><pre><code>%num %v1!            declare numeric v1
%num %v2!
%get %v1!            read input
%let %v2 %v1 2 * 5 +!   v2 = v1*2 + 5 (postfix)
%out %v2!</code></pre>` }
  ] }
},
{
  id: 'plt3', subject: 'plt', num: 3, theme: 'front', title: 'Lexical analysis overview', short: 'Lexical analysis',
  lecture: 'Tutorial-03 topic: Lexical Analysis Overview',
  summary: 'The scanner’s job, tokens vs lexemes vs patterns, string terms (prefix, suffix, substring, subsequence), regular expressions and regular definitions, and building a token table.',
  sections: [
    { h: 'What the scanner does', pics: [{ flow: [['Source characters', 'count = count + 1;'], ['Scanner', 'Groups characters, skips spaces'], ['Tokens', '<id,count> <=> <id,count> <+> <num,1> <;>']], color: 'p', title: 'Lexical analysis' }], body: NOTE + `
      <p>The scanner reads characters, groups them into <b>lexemes</b>, outputs <b>tokens</b> to the parser, removes white space and comments, records identifiers in the symbol table, and reports lexical errors (illegal characters).</p>` },
    { h: 'Token, lexeme, pattern', pics: [{ cards: [{ t: 'Token', s: 'Category: ID, NUM, PLUS', c: 'p' }, { t: 'Lexeme', s: 'Actual text: count, 42, +', c: 't' }, { t: 'Pattern', s: 'Rule: letter (letter|digit)*', c: 'c' }], cols: 3, title: 'Three terms' }], body: `
      <p>For <code>count = count + 1;</code> the lexemes are <code>count</code>, <code>=</code>, <code>count</code>, <code>+</code>, <code>1</code>, <code>;</code>. Both <code>count</code> lexemes have token ID; <code>1</code> has token NUM.</p>` },
    { h: 'Strings and languages', body: `
      <ul><li><b>Prefix</b>: remove zero or more symbols from the end ("pro" of "program").</li><li><b>Suffix</b>: remove from the start ("gram").</li><li><b>Substring</b>: remove a prefix and a suffix ("ogr").</li><li><b>Subsequence</b>: delete any symbols, not necessarily adjacent ("pgm").</li><li>ε is the empty string; it is a prefix, suffix and substring of every string.</li></ul>` },
    { h: 'Regular expressions', pics: [{ cards: [{ t: 'a | b', s: 'Union: a or b', c: 'p' }, { t: 'ab', s: 'Concatenation', c: 'p' }, { t: 'a*', s: 'Zero or more', c: 'p' }, { t: 'a+', s: 'One or more (aa*)', c: 't' }, { t: 'a?', s: 'Zero or one', c: 't' }, { t: '[0-9]', s: 'Character class', c: 't' }], cols: 3, title: 'Regex operators' }], body: `
      <p>Regular definitions name patterns:</p>
      <pre><code>letter → [A-Za-z_]
digit  → [0-9]
id     → letter (letter | digit)*
num    → digit+ (. digit+)?
relop  → &lt; | &lt;= | = | &lt;&gt; | &gt; | &gt;=</code></pre>
      <p>A <b>token table</b> lists each token type with its regular expression; it is the spec for the scanner.</p>` }
  ],
  links: [
    { to: 'plt4', topic: 'Regex to automata', text: 'Topic 4 turns these regular expressions into NFAs and DFAs.' },
    { to: 'dcs1', topic: 'Input interpreted as code', text: 'SQL injection (DB & Cloud Security Ch 1) happens when user input is scanned as SQL tokens.' },
    { to: 'ch3', topic: 'Black-box testing', text: 'Testing a scanner with valid and invalid words is black-box testing (Software QA Ch 3).' }
  ],
  mindmaps: [{ center: 'Lexical analysis', branches: [
    { label: 'Scanner job', color: 'p', kids: ['Characters → tokens', 'Skip spaces, comments', 'Symbol table, errors'] },
    { label: 'Terms', color: 'p', kids: ['Token: category', 'Lexeme: text', 'Pattern: rule'] },
    { label: 'Strings', color: 't', kids: ['Prefix, suffix', 'Substring', 'Subsequence, ε'] },
    { label: 'Regex', color: 'c', kids: ['| concat *', '+ ? [ ]', 'Regular definitions'] },
    { label: 'Token table', color: 'a', kids: ['Token types', 'Regex per token'] }
  ] }],
  cases: [
    { co: 'Cloudflare', logo: 'CF', color: 'r', year: '2019', title: 'A regex took down websites', story: 'A new firewall rule contained a regular expression that caused catastrophic backtracking. CPUs across Cloudflare’s network hit 100% and many sites were unreachable for about half an hour.', lesson: 'Regex engines that backtrack can be exponential; DFA-based matching avoids this.' },
    { co: 'Lex / Flex', logo: 'LX', color: 'p', year: '1975→', title: 'Scanner generators', story: 'Lex (Bell Labs) and its successor Flex generate a C scanner from a file of regular expressions and actions. JLex (Tutorial 8) does the same for Java.', lesson: 'Write the token table; the tool builds the DFA.' }
  ],
  code: [
    { title: 'A table-driven scanner with regular expressions', lang: 'Python', explain: 'The token table is a list of (name, regex). The scanner tries them in order and reports unknown characters.', src: String.raw`import re

TOKENS = [
    ("NUM",   r"\d+(\.\d+)?"),
    ("ID",    r"[A-Za-z_]\w*"),
    ("OP",    r"[+\-*/=]"),
    ("SEMI",  r";"),
    ("SKIP",  r"\s+"),
    ("ERROR", r"."),
]
MASTER = re.compile("|".join(f"(?P<{n}>{p})" for n, p in TOKENS))
KEYWORDS = {"if", "while", "print"}

def scan(text):
    for m in MASTER.finditer(text):
        kind, lexeme = m.lastgroup, m.group()
        if kind == "SKIP":
            continue
        if kind == "ID" and lexeme in KEYWORDS:
            kind = lexeme.upper()
        yield kind, lexeme

print(list(scan("count = count + 1.5; @")))
# [('ID','count'), ('OP','='), ('ID','count'), ('OP','+'), ('NUM','1.5'), ('SEMI',';'), ('ERROR','@')]` }
  ],
  beyond: [
    { skill: 'security', why: 'Input validation and parameterised queries stop user text from being scanned as code (SQL injection, XSS).' },
    { skill: 'dsa', why: 'Regular expressions are equivalent to finite automata, a core computer science result.' }
  ],
  cards: [
    ['Token vs lexeme', 'Token: category (ID). Lexeme: actual characters (count).'],
    ['Pattern', 'The rule describing which lexemes belong to a token, usually a regex.'],
    ['Prefix vs subsequence', 'Prefix: leading part. Subsequence: any symbols kept in order, not necessarily adjacent.'],
    ['a+ in terms of *', 'a+ = aa*'],
    ['Regex for identifiers', 'letter (letter | digit)*']
  ],
  quiz: [
    { q: 'Which string does (ab)+ NOT match?', o: ['ab', 'abab', 'aba', 'ababab'], a: 2, why: 'Must be one or more whole "ab" pairs.' },
    { q: 'In "x = 42;", 42 is the…', o: ['Token', 'Lexeme', 'Pattern', 'Grammar'], a: 1, why: 'The actual text; its token is NUM.' },
    { q: 'Which matches the empty string?', o: ['a+', '(ab)+', 'a*b*', '(a|b)+'], a: 2, why: 'Both stars can repeat zero times.' }
  ],
  tutorial: { no: 3, source: 'Tutorial-03-t31213.doc', items: [
    { n: 'D1', q: 'Differences between a lexeme and a token?', a: `<p>A <b>lexeme</b> is the actual sequence of characters in the source (e.g. <code>count</code>, <code>42</code>). A <b>token</b> is the category the lexeme belongs to (ID, NUM), often with an attribute (pointer to the symbol table or the value). Many lexemes map to one token.</p>` },
    { n: 'D2', q: 'Let s = program. Write all prefixes, suffixes, substrings and subsequences.', a: `<p><b>Prefixes</b> (8): ε, p, pr, pro, prog, progr, progra, program.</p><p><b>Suffixes</b> (8): ε, m, am, ram, gram, ogram, rogram, program.</p><p><b>Substrings</b>: every contiguous piece: ε plus 28 choices of start/end (n(n+1)/2 with n = 7), e.g. p, r, o, g, a, m, pr, ro, og, gr, ra, am, pro, rog, ogr, gra, ram, …, program. (Some repeat because r appears twice.)</p><p><b>Subsequences</b>: keep any letters in order: 2<sup>7</sup> = 128 choices (incl. ε), e.g. pgm, roam, pram, prgm, oga.</p>` },
    { n: 'D3', q: 'Give words matching: a*, a | b+, (ab)+, a*b*, (a | b)+.', a: `<table><tr><th>Regex</th><th>Examples</th></tr><tr><td>a*</td><td>ε, a, aa, aaa</td></tr><tr><td>a | b+</td><td>a, b, bb, bbb (not ab)</td></tr><tr><td>(ab)+</td><td>ab, abab, ababab</td></tr><tr><td>a*b*</td><td>ε, a, b, aab, abbb (no b before a)</td></tr><tr><td>(a | b)+</td><td>a, b, ab, ba, abba (any non-empty a/b string)</td></tr></table>` },
    { n: 'P1', kind: 'practical', q: 'Practical: check input against a+ and the other regexes; move checks into a function returning a token.', a: `<pre><code>import re
PATTERNS = {"a*": "a*", "a|b+": "a|b+", "(ab)+": "(ab)+", "a*b*": "a*b*", "(a|b)+": "(a|b)+"}
def check(word, rx):
    return ("VALID" if re.fullmatch(rx, word) else "INVALID", word)
for name, rx in PATTERNS.items():
    print(name, check("abab", rx))</code></pre>` },
    { n: 'A1', kind: 'assignment', q: 'Assignment: list terminals of your language, token types and a token table with regular expressions.', a: `<table><tr><th>Token</th><th>Regex (example language, prefix %)</th></tr><tr><td>KEYWORD</td><td>%(tit|who|out|let|get|num|str)</td></tr><tr><td>VARIABLE</td><td>%v[0-9]</td></tr><tr><td>NUMBER</td><td>[0-9]+</td></tr><tr><td>STRING</td><td>"[^"]*"</td></tr><tr><td>OPERATOR</td><td>[+\\-*/]</td></tr><tr><td>END</td><td>!</td></tr></table>` }
  ] }
},
{
  id: 'plt4', subject: 'plt', num: 4, theme: 'front', title: 'Lexical analysis implementation', short: 'NFA and DFA',
  lecture: 'Tutorial-04 topic: Lexical Analysis Implementation',
  summary: 'Finite automata: NFA vs DFA, Thompson’s construction from regular expressions, subset construction (NFA → DFA), recognising keywords like assembly mnemonics with a DFA, and coding a scanner from a DFA.',
  sections: [
    { h: 'NFA vs DFA', pics: [{ compare: { a: { title: 'NFA', color: 'p', items: ['Many moves for one symbol', 'ε-moves allowed', 'Easy to build from regex', 'Slow to simulate directly'] }, b: { title: 'DFA', color: 't', items: ['Exactly one move per symbol', 'No ε-moves', 'Fast: one step per char', 'May have more states'] } }, title: 'Finite automata' }], body: NOTE + `
      <p>A finite automaton is (states, alphabet, transitions, start state, accepting states). Both NFAs and DFAs recognise exactly the <b>regular languages</b>, so they are equal in power. Scanners use DFAs for speed.</p>` },
    { h: 'Thompson’s construction', pics: [{ cards: [{ t: 'Symbol a', s: 'start —a→ accept', c: 'p' }, { t: 'r s', s: 'Join r’s accept to s’s start', c: 'p' }, { t: 'r | s', s: 'New start ε to both; both ε to new accept', c: 't' }, { t: 'r*', s: 'ε loop back and ε skip', c: 't' }], cols: 2, title: 'Building an NFA from a regex' }], body: `
      <p>Build small NFAs for each symbol, then combine them for concatenation, union and star. The result has one start and one accept state.</p>` },
    { h: 'Subset construction (NFA → DFA)', pics: [{ flow: [['ε-closure(start)', 'First DFA state'], ['For each symbol a', 'move then ε-closure'], ['New set?', 'Add as a new DFA state'], ['Accepting', 'Any set holding an NFA accept state']], color: 'c', title: 'Subset construction' }], body: `
      <p>Each DFA state is a <b>set of NFA states</b>. <b>ε-closure(S)</b> = all states reachable from S by ε-moves. Repeat until no new sets appear. A dead state (empty set) handles impossible input.</p>` },
    { h: 'From DFA to scanner code', body: `
      <p>Either a <b>transition table</b> (state × character → next state) driven by a loop, or <b>hand-coded</b> states with if/switch (like the tutorial's <code>scanToken()</code>). The scanner follows the <b>longest match</b> rule and returns the token for the last accepting state reached.</p>` }
  ],
  links: [
    { to: 'plt3', topic: 'Regular expressions', text: 'The regexes from Topic 3 are the input to Thompson’s construction.' },
    { to: 'plt7', topic: 'DFA of LR items', text: 'Bottom-up parsers also use a DFA, built from LR items (Topic 7).' }
  ],
  mindmaps: [{ center: 'Automata', branches: [
    { label: 'NFA', color: 'p', kids: ['Many moves, ε', 'Easy from regex', 'Thompson construction'] },
    { label: 'DFA', color: 't', kids: ['One move per symbol', 'Fast scanning', 'Dead state'] },
    { label: 'Subset construction', color: 'c', kids: ['ε-closure', 'move(S, a)', 'Sets become states'] },
    { label: 'Scanner', color: 'a', kids: ['Transition table', 'Hand-coded states', 'Longest match'] }
  ] }],
  cases: [
    { co: 'Google RE2', logo: 'RE2', color: 't', year: '2010', title: 'Regex without backtracking', story: 'Google’s RE2 library matches regular expressions with automata, guaranteeing time linear in the input. It was built to avoid the exponential blow-ups of backtracking engines.', lesson: 'DFAs give predictable, safe performance.' },
    { co: 'grep', logo: 'GR', color: 'p', year: '1973→', title: 'Automata at the command line', story: 'Unix grep and its descendants compile search patterns into finite automata to scan huge files quickly.', lesson: 'The same theory powers everyday tools.' }
  ],
  code: [
    { title: 'Subset construction in Python', lang: 'Python', explain: 'Converts an NFA (with ε written as "") to a DFA. States of the DFA are frozensets of NFA states.', src: String.raw`def eps_closure(states, nfa):
    stack, seen = list(states), set(states)
    while stack:
        s = stack.pop()
        for t in nfa.get((s, ""), ()):
            if t not in seen:
                seen.add(t); stack.append(t)
    return frozenset(seen)

def nfa_to_dfa(nfa, start, accepts, alphabet):
    first = eps_closure({start}, nfa)
    dfa, todo = {}, [first]
    while todo:
        S = todo.pop()
        for a in alphabet:
            moved = {t for s in S for t in nfa.get((s, a), ())}
            T = eps_closure(moved, nfa)
            dfa[(S, a)] = T
            if T and T not in {k[0] for k in dfa} and T not in todo:
                todo.append(T)
    finals = {S for (S, _) in dfa if S & accepts}
    return first, dfa, finals

# NFA for (a|b)*abb
nfa = {(0, ""): {1, 7}, (1, ""): {2, 4}, (2, "a"): {3}, (4, "b"): {5},
       (3, ""): {6}, (5, ""): {6}, (6, ""): {1, 7}, (7, "a"): {8},
       (8, "b"): {9}, (9, "b"): {10}}
start, dfa, finals = nfa_to_dfa(nfa, 0, {10}, "ab")
print(len({k[0] for k in dfa}), "DFA states")   # 5` },
    { title: 'DFA for assembly mnemonics', lang: 'Python', explain: 'The DFA from Tutorial 4 Q4–6 as a trie: each state is the prefix read so far.', src: String.raw`MNEMONICS = ["MUL", "MOV", "JMP", "ADD", "ADC", "PSH", "POP", "INS"]

def build_dfa(words):
    delta, accept = {}, set()
    for w in words:
        state = ""
        for ch in w:
            delta[(state, ch)] = state + ch
            state += ch
        accept.add(state)
    return delta, accept

delta, accept = build_dfa(MNEMONICS)

def recognise(word):
    state = ""
    for ch in word:
        state = delta.get((state, ch))
        if state is None:
            return "NO"           # dead state
    return "YES" if state in accept else "NO"

for w in ["MOV", "ADC", "POT"]:
    print(w, recognise(w))       # YES, YES, NO` }
  ],
  beyond: [
    { skill: 'dsa', why: 'Tries, graphs and state machines from this topic appear in autocomplete, routing and UI logic.' },
    { skill: 'testing', why: 'State machines are easy to test: try every transition and the dead state.' }
  ],
  cards: [
    ['NFA vs DFA', 'NFA: several moves and ε-moves allowed. DFA: exactly one move per symbol, no ε.'],
    ['ε-closure(S)', 'All states reachable from S using only ε-moves.'],
    ['Subset construction', 'Each DFA state is a set of NFA states; built with move and ε-closure.'],
    ['Accepting DFA state', 'Any set that contains an NFA accepting state.'],
    ['Longest match rule', 'The scanner takes the longest lexeme that forms a valid token.']
  ],
  quiz: [
    { q: 'Which is TRUE?', o: ['NFAs recognise more languages than DFAs', 'DFAs and NFAs recognise the same languages', 'DFAs allow ε-moves', 'NFAs have one move per symbol'], a: 1, why: 'Both recognise exactly the regular languages.' },
    { q: 'Scanners usually run a DFA because…', o: ['It has fewer states', 'Each character needs exactly one step', 'It allows ε-moves', 'It is easier to draw'], a: 1, why: 'Deterministic, fast simulation.' },
    { q: 'For the mnemonic DFA, input "POT" ends…', o: ['In POP', 'In an accepting state', 'In the dead state', 'In PSH'], a: 2, why: 'From state PO there is no move on T.' }
  ],
  tutorial: { no: 4, source: 'Tutorial-04-t31213.doc', items: [
    { n: 'D1', q: 'Convert the given NFA to an equivalent DFA.', a: `<p>The NFA is a figure in your tutorial sheet (states 0–3 on a, b), so it isn't reproduced here. Method:</p><ol><li>Start state A = ε-closure({0}).</li><li>For each DFA state and each symbol, compute move then ε-closure; each new set is a new state.</li><li>Mark sets containing an NFA final state as accepting.</li><li>Draw the transition table, then the DFA.</li></ol><p>Use the subset-construction code in the Code tab to check your answer.</p>` },
    { n: 'D2', q: 'Draw NFAs for: (a* | b*) a; a (a* | aaa | ab*); (00 | 000 | 01) 0; (00 | 11) | (0 | 1)*; (0 | 1)* (00 | 11) (0 | 1)*.', a: `<p>Use Thompson's rules: union = new start with ε to each branch and ε from each branch to a new end; star = ε loop back and ε skip; concatenation = link end to start.</p><ul><li><b>(a*|b*)a</b>: ε-branch to an a-loop, ε-branch to a b-loop, both ε to a state with an a-edge to the final state.</li><li><b>a(a*|aaa|ab*)</b>: a-edge, then three ε-branches: a-loop; a-a-a chain; a then b-loop.</li><li><b>(00|000|01)0</b>: three branches 0-0, 0-0-0, 0-1, joined, then a 0-edge to final.</li><li><b>(00|11)|(0|1)*</b>: top branch 0-0 or 1-1; bottom branch a loop on 0 and 1 (accepts ε).</li><li><b>(0|1)*(00|11)(0|1)*</b>: loop on 0,1; then 0-0 or 1-1; then loop on 0,1. It accepts strings containing 00 or 11.</li></ul>` },
    { n: 'D3', q: 'What is the difference between NFA and DFA? Convert one NFA above into a DFA.', a: `<p>NFA: several transitions per symbol and ε-moves; DFA: exactly one transition per symbol, no ε. Both accept the regular languages.</p><p><b>DFA for (a* | b*) a</b> (language = a⁺ ∪ b*a):</p><table><tr><th>State</th><th>a</th><th>b</th><th>Accept?</th></tr><tr><td>S0 (start)</td><td>S1</td><td>S2</td><td>no</td></tr><tr><td>S1 (a⁺)</td><td>S1</td><td>dead</td><td>yes</td></tr><tr><td>S2 (b⁺)</td><td>S3</td><td>S2</td><td>no</td></tr><tr><td>S3 (b⁺a)</td><td>dead</td><td>dead</td><td>yes</td></tr></table><p>Check: "aaa" ✓, "bba" ✓, "ab" ✗, "baa" ✗.</p>` },
    { n: 'D4', q: 'Draw an NFA recognising MUL MOV JMP ADD ADC PSH POP INS (3-letter input; YES if a mnemonic).', a: `<p>Start state with ε-moves into eight separate 3-edge chains, one per mnemonic (e.g. M→U→L), each ending in an accepting "YES" state. Any input that doesn't complete a chain is "NO".</p>` },
    { n: 'D5', q: 'Convert the NFA in Q4 to a DFA.', a: `<p>Merging common prefixes gives a tree-shaped DFA (a trie):</p><pre><code>start -M-> M  -U-> MU -L-> MUL*
           M  -O-> MO -V-> MOV*
start -J-> J  -M-> JM -P-> JMP*
start -A-> A  -D-> AD -D-> ADD*
                   AD -C-> ADC*
start -P-> P  -S-> PS -H-> PSH*
           P  -O-> PO -P-> POP*
start -I-> I  -N-> IN -S-> INS*
(* = accepting; every missing edge goes to a dead state = NO)</code></pre>` },
    { n: 'D6', q: 'How does the DFA recognise "MOV", "ADC" and "POT"?', a: `<ul><li><b>MOV</b>: start –M→ M –O→ MO –V→ MOV (accepting) → <b>YES</b>.</li><li><b>ADC</b>: start –A→ A –D→ AD –C→ ADC (accepting) → <b>YES</b>.</li><li><b>POT</b>: start –P→ P –O→ PO; PO only has an edge on P, so T goes to the dead state → <b>NO</b>.</li></ul>` },
    { n: 'P1', kind: 'practical', q: 'Practical: "My Compiler" scanner with cToken/cScanner; add INTEGER and OPERATOR tokens and implement the mnemonic DFA.', a: `<p>Add token kinds <code>INTEGER = 3</code>, <code>OPERATOR = 4</code>. In <code>scanToken()</code>: if the char is a digit, take digits → INTEGER; if it is one of + - * / → OPERATOR; letters → check the mnemonic DFA (Code tab) and return a MNEMONIC token if accepted, else IDENTIFIER; anything else → UNKNOWN and show an error.</p>` },
    { n: 'A1', kind: 'assignment', q: 'Assignment: NFA for your tokens, subset construction to DFA, token type for each final state.', a: `<p>Draw one NFA per token regex, join them with a new start state and ε-moves, run subset construction, and label each accepting DFA state with the token whose NFA accept state it contains (if several, pick the one listed first, e.g. keyword before variable).</p>` }
  ] }
},
{
  id: 'plt5', subject: 'plt', num: 5, theme: 'front', title: 'Syntax analysis', short: 'Syntax analysis',
  lecture: 'Tutorial-05 topic: Syntax Analysis',
  summary: 'The parser’s role, context-free grammars (terminals, non-terminals, productions, LHS/RHS), leftmost and rightmost derivations, parse trees, ambiguity, and checking whether sentences belong to a grammar.',
  sections: [
    { h: 'Role of the parser', pics: [{ flow: [['Tokens from scanner'], ['Parser', 'Checks grammar'], ['Parse tree', 'Or syntax error']], dir: 'h', color: 'p', title: 'Syntax analysis' }], body: NOTE + `
      <p>The parser asks the scanner for tokens, checks they form a valid sentence of the grammar, builds a parse tree (or syntax tree), and reports and recovers from syntax errors.</p>` },
    { h: 'Context-free grammars', body: `
      <p>Each production has one non-terminal on the <b>left-hand side (LHS)</b> and a string of terminals and non-terminals on the <b>right-hand side (RHS)</b>.</p>
      <pre><code>S → a A B a A B      LHS: S   RHS: a A B a A B
A → b | b A
B → a | a B</code></pre>` },
    { h: 'Derivations and parse trees', pics: [{ tree: { root: 'S', kids: [{ label: 'a' }, { label: 'A', kids: ['b', 'A → b'] }, { label: 'B', kids: ['a', 'B → a'] }, { label: 'a' }, { label: 'A', kids: ['b'] }, { label: 'B', kids: ['a', 'B → a'] }] }, color: 'p', title: 'Parse tree for abbaaabaa' }], body: `
      <p><b>Leftmost derivation</b>: always replace the leftmost non-terminal; <b>rightmost</b>: the rightmost. Both give the same parse tree for an unambiguous grammar. A sentence is valid if a derivation from S reaches it.</p>` },
    { h: 'Ambiguity', body: `
      <p>A grammar is <b>ambiguous</b> if one sentence has two parse trees. Classic: <code>E → E + E | E * E | id</code> gives two trees for <code>id + id * id</code>. Fix with precedence levels:</p>
      <pre><code>E → E + T | T
T → T * F | F
F → ( E ) | id</code></pre>` }
  ],
  links: [
    { to: 'plt6', topic: 'Top-down parsing', text: 'Topic 6 builds parsers that follow leftmost derivations.' },
    { to: 'plt7', topic: 'Bottom-up parsing', text: 'Topic 7 follows rightmost derivations in reverse.' },
    { to: 'plt2', topic: 'Grammars', text: 'Grammars were introduced in Topic 2.' }
  ],
  mindmaps: [{ center: 'Syntax analysis', branches: [
    { label: 'Parser role', color: 'p', kids: ['Tokens → tree', 'Syntax errors'] },
    { label: 'CFG', color: 'p', kids: ['Terminals, non-terminals', 'Productions LHS → RHS', 'Start symbol'] },
    { label: 'Derivations', color: 't', kids: ['Leftmost', 'Rightmost', 'Parse tree'] },
    { label: 'Ambiguity', color: 'r', kids: ['Two trees, one sentence', 'Fix: precedence levels'] }
  ] }],
  cases: [
    { co: 'Python 3.9', logo: 'PY', color: 'p', year: '2020', title: 'New parser', story: 'Python replaced its old LL(1) parser with a PEG-based parser (PEP 617), making it easier to add new syntax such as structural pattern matching.', lesson: 'Grammar and parser design limit what a language can express.' },
    { co: 'C’s dangling else', logo: 'C', color: 'r', year: 'classic', title: 'An ambiguous if', story: '"if (a) if (b) s1; else s2;" could attach else to either if. C and Java resolve it by matching else with the nearest if.', lesson: 'Real languages contain ambiguity that parsers must resolve.' }
  ],
  code: [
    { title: 'Check sentences with a recursive grammar matcher', lang: 'Python', explain: 'Tests the six strings from Tutorial 5 Q3 against assign → ident = expr ;', src: String.raw`import re

def tokens(s):
    return re.findall(r"[A-Z]+|\d+|[=+*/();]", s)

def parse_assign(t):
    pos = 0
    def expect(x):
        nonlocal pos
        if pos < len(t) and t[pos] == x:
            pos += 1; return True
        return False
    def ident():
        nonlocal pos
        if pos < len(t) and t[pos] in ("A", "B", "C"):
            pos += 1; return True
        return False
    def expr():
        if expect("("):
            return expr() and expect(")")
        if not ident():
            return False
        if expect("+") or expect("*"):
            return expr()
        return True
    ok = ident() and expect("=") and expr() and expect(";")
    return ok and pos == len(t)

for s in ["A = A + B * C", "B = A / C", "C = B + 10;", "A = B + C * A + A;",
          "B = (A + B) * C + A;", "C = (A + B * (C + A));"]:
    print(f"{s:24} {'valid' if parse_assign(tokens(s)) else 'invalid'}")` }
  ],
  beyond: [
    { skill: 'testing', why: 'Valid and invalid sample sentences are the test cases for your parser.' },
    { skill: 'frameworks', why: 'Linters and formatters (ESLint, Prettier) work on parse trees of your code.' }
  ],
  cards: [
    ['LHS and RHS', 'LHS: the single non-terminal being defined. RHS: what it can be replaced by.'],
    ['Leftmost derivation', 'Always replace the leftmost non-terminal first.'],
    ['Ambiguous grammar', 'Some sentence has more than one parse tree.'],
    ['Fix for E → E+E | E*E | id ambiguity', 'Use precedence levels: E → E+T | T, T → T*F | F, F → (E) | id.']
  ],
  quiz: [
    { q: 'Using assign → ident = expr ;, which is valid?', o: ['A = A + B * C', 'C = B + 10;', 'A = B + C * A + A;', 'B = A / C'], a: 2, why: 'The others miss ;, use a number, or use /.' },
    { q: 'An ambiguous grammar has…', o: ['No parse tree', 'More than one parse tree for some sentence', 'Left recursion', 'ε productions'], a: 1, why: 'Definition of ambiguity.' }
  ],
  tutorial: { no: 5, source: 'Tutorial-05-t31213.doc', items: [
    { n: 'D1', q: 'For S → aABaAB, A → b | bA, B → a | aB: list terminals, non-terminals, productions, LHS and RHS.', a: `<p><b>Terminals</b>: a, b. <b>Non-terminals</b>: S, A, B (start S).</p><table><tr><th>#</th><th>LHS</th><th>RHS</th></tr><tr><td>1</td><td>S</td><td>a A B a A B</td></tr><tr><td>2</td><td>A</td><td>b</td></tr><tr><td>3</td><td>A</td><td>b A</td></tr><tr><td>4</td><td>B</td><td>a</td></tr><tr><td>5</td><td>B</td><td>a B</td></tr></table>` },
    { n: 'D2', q: 'Prove abbaaabaa is valid using a derivation and parse tree.', a: `<p>Split: a · <b>bb</b>(A) · <b>aa</b>(B) · a · <b>b</b>(A) · <b>aa</b>(B).</p><pre><code>S ⇒ aABaAB          (1)
  ⇒ abABaAB         A → bA
  ⇒ abbBaAB         A → b
  ⇒ abbaBaAB        B → aB
  ⇒ abbaaaAB        B → a
  ⇒ abbaaabB        A → b
  ⇒ abbaaabaB       B → aB
  ⇒ abbaaabaa       B → a   ✓</code></pre><p>Parse tree: S has children a, A, B, a, A, B. The first A → b A → b; the first B → a B → a; the second A → b; the second B → a B → a. Reading the leaves left to right gives abbaaabaa.</p>` },
    { n: 'D3', q: 'Show whether each string is valid using derivation (assign → ident = expr ;).', a: `<ul><li><b>A = A + B * C</b> ✗ missing the final <code>;</code>.</li><li><b>B = A / C</b> ✗ <code>/</code> is not an operator in the grammar (and no <code>;</code>).</li><li><b>C = B + 10;</b> ✗ <code>10</code> is not an ident (only A, B, C).</li><li><b>A = B + C * A + A;</b> ✓ assign ⇒ A = expr ; ⇒ A = B + expr ; ⇒ A = B + C * expr ; ⇒ A = B + C * A + expr ; ⇒ A = B + C * A + A ;</li><li><b>B = (A + B) * C + A;</b> ✗ expr → ( expr ) cannot be followed by <code>*</code>: only ident can come before + or *.</li><li><b>C = (A + B * (C + A));</b> ✓ expr ⇒ ( expr ) ⇒ ( A + expr ) ⇒ ( A + B * expr ) ⇒ ( A + B * ( expr ) ) ⇒ ( A + B * ( C + A ) )</li></ul>` },
    { n: 'P1', kind: 'practical', q: 'Practical: load sentence.txt with OpenFileDialog; identify token types for the grammar and update the scanner.', a: `<p>Token types for this grammar: IDENT (A|B|C), ASSIGN (=), PLUS (+), TIMES (*), LPAREN, RPAREN, SEMI (;), EOF, UNKNOWN. Add each to cToken and recognise single-character tokens in scanToken().</p>` },
    { n: 'A1', kind: 'assignment', q: 'Assignment: write the grammar for your language (patterns, non-terminals, productions, start symbol).', a: `<pre><code>program   → stmt { stmt }
stmt      → title | author | output | assign | input | decl
title     → %tit STRING END
output    → %out ( STRING | VAR ) END
assign    → %let VAR postfix END
postfix   → operand { operand | OP }
operand   → VAR | NUMBER
decl      → ( %num | %str ) VAR END</code></pre>` }
  ] }
},
{
  id: 'plt6', subject: 'plt', num: 6, theme: 'front', title: 'Top-down parsing', short: 'Top-down parsing',
  lecture: 'Tutorial-06 topic: Top-down Parsing',
  summary: 'Recursive descent and predictive LL(1) parsing, eliminating left recursion, left factoring, EBNF, computing FIRST and FOLLOW sets, building the LL(1) parsing table, and the dangling-else conflict.',
  sections: [
    { h: 'Top-down parsing', pics: [{ flow: [['Start symbol'], ['Predict a production', 'Look at next token'], ['Match terminals', 'Recurse into non-terminals'], ['Whole input consumed', 'Accept']], color: 'p', title: 'Top-down (leftmost derivation)' }], body: NOTE + `
      <p><b>Recursive descent</b>: one function per non-terminal. <b>Predictive (LL(1))</b>: chooses the production using one lookahead token, so no backtracking. It needs a grammar with <b>no left recursion</b> and <b>no common prefixes</b>.</p>` },
    { h: 'Eliminating left recursion', pics: [{ compare: { a: { title: 'Left recursive', color: 'r', items: ['A → A α | β', 'Recursive descent loops forever'] }, b: { title: 'Rewritten', color: 'g', items: ['A → β A′', 'A′ → α A′ | ε', 'EBNF: A → β { α }'] } }, title: 'Left recursion' }], body: `
      <pre><code>exp → exp + term | exp - term | term
⇒ exp  → term exp′
  exp′ → + term exp′ | - term exp′ | ε
EBNF:  exp → term { ( + | - ) term }</code></pre>` },
    { h: 'Left factoring', body: `
      <p>Needed when two alternatives start with the same symbols, so one lookahead can't choose:</p>
      <pre><code>A → α β1 | α β2   ⇒   A → α A′ ,  A′ → β1 | β2</code></pre>` },
    { h: 'FIRST and FOLLOW', pics: [{ cards: [{ t: 'FIRST(α)', s: 'Terminals that can start α (ε if α ⇒* ε)', c: 'p' }, { t: 'FOLLOW(A)', s: 'Terminals that can come right after A', c: 't' }, { t: '$ in FOLLOW(start)', s: 'End of input', c: 'c' }], cols: 3, title: 'Two sets' }], body: `
      <p><b>FOLLOW rules:</b> for A → α B β, add FIRST(β) − {ε} to FOLLOW(B); if β ⇒* ε (or β is empty), add FOLLOW(A) to FOLLOW(B).</p>
      <p><b>LL(1) table M[A, a]</b>: for each A → α, put it in M[A, a] for every a in FIRST(α); if ε ∈ FIRST(α), also for every a in FOLLOW(A). Two entries in one cell = <b>conflict</b> (not LL(1)).</p>` }
  ],
  links: [
    { to: 'plt5', topic: 'Derivations', text: 'Top-down parsers build the leftmost derivation from Topic 5.' },
    { to: 'plt7', topic: 'Bottom-up alternative', text: 'Bottom-up parsers (Topic 7) handle left recursion directly.' }
  ],
  mindmaps: [{ center: 'Top-down', branches: [
    { label: 'Methods', color: 'p', kids: ['Recursive descent', 'Predictive LL(1)', 'No backtracking'] },
    { label: 'Fix grammar', color: 'r', kids: ['Remove left recursion', 'Left factoring', 'EBNF { }'] },
    { label: 'Sets', color: 't', kids: ['FIRST', 'FOLLOW', '$ end marker'] },
    { label: 'Table', color: 'c', kids: ['M[A, a]', 'ε uses FOLLOW', 'Conflict = not LL(1)'] }
  ] }],
  cases: [
    { co: 'GCC', logo: 'GCC', color: 'p', year: '2004–2006', title: 'Hand-written parsers win', story: 'GCC replaced its Bison-generated C++ and C parsers with hand-written recursive descent parsers, for better error messages and easier maintenance. Clang also uses recursive descent.', lesson: 'Recursive descent is the most common parser in real compilers.' },
    { co: 'ANTLR', logo: 'AN', color: 't', year: '1989→', title: 'Generated top-down parsers', story: 'ANTLR generates LL(*) top-down parsers from grammars and is used in many tools, for example SQL engines such as Hive and Presto/Trino.', lesson: 'Write the grammar; the tool writes the recursive descent code.' }
  ],
  code: [
    { title: 'Compute FIRST and FOLLOW', lang: 'Python', explain: 'Fixed-point computation for the Tutorial 6 Q4 grammar. "" stands for ε.', src: String.raw`G = {
    "program":     [["{", "statement", "}"]],
    "statement":   [["if_stmt"], ["assign_stmt"]],
    "if_stmt":     [["if", "(", "exp", ")", "statement", "else_part"]],
    "else_part":   [["else", "statement"], []],
    "assign_stmt": [["id", "=", "exp"]],
    "exp":         [["0"], ["1"]],
}
N = set(G)
FIRST = {A: set() for A in N}

def first_of(seq):
    out = set()
    for s in seq:
        f = FIRST[s] if s in N else {s}
        out |= f - {""}
        if "" not in f:
            return out
    return out | {""}

changed = True
while changed:
    changed = False
    for A, rules in G.items():
        for r in rules:
            new = first_of(r)
            if not new <= FIRST[A]:
                FIRST[A] |= new; changed = True

FOLLOW = {A: set() for A in N}; FOLLOW["program"].add("$")
changed = True
while changed:
    changed = False
    for A, rules in G.items():
        for r in rules:
            for i, B in enumerate(r):
                if B in N:
                    f = first_of(r[i + 1:])
                    new = (f - {""}) | (FOLLOW[A] if "" in f else set())
                    if not new <= FOLLOW[B]:
                        FOLLOW[B] |= new; changed = True

for A in G:
    print(f"{A:12} FIRST={sorted(FIRST[A])}  FOLLOW={sorted(FOLLOW[A])}")` },
    { title: 'Recursive descent for exp → term { (+|-) term }', lang: 'Python', explain: 'After removing left recursion, the EBNF loop becomes a while loop. This also evaluates the expression.', src: String.raw`import re

class Parser:
    def __init__(self, text):
        self.toks = re.findall(r"\d+|[+\-*/()]", text) + ["$"]
        self.i = 0
    def peek(self): return self.toks[self.i]
    def eat(self, t):
        if self.peek() != t: raise SyntaxError(f"expected {t}, got {self.peek()}")
        self.i += 1
    def exp(self):                      # exp -> term { (+|-) term }
        v = self.term()
        while self.peek() in "+-":
            op = self.peek(); self.eat(op)
            v = v + self.term() if op == "+" else v - self.term()
        return v
    def term(self):                     # term -> factor { (*|/) factor }
        v = self.factor()
        while self.peek() in "*/":
            op = self.peek(); self.eat(op)
            v = v * self.factor() if op == "*" else v / self.factor()
        return v
    def factor(self):                   # factor -> ( exp ) | num
        if self.peek() == "(":
            self.eat("("); v = self.exp(); self.eat(")"); return v
        t = self.peek(); self.i += 1; return int(t)

print(Parser("2 + 3 * (4 - 1)").exp())   # 11` }
  ],
  beyond: [
    { skill: 'dsa', why: 'Recursion and fixed-point iteration (FIRST/FOLLOW) are general algorithm techniques.' },
    { skill: 'api', why: 'JSON and many config formats are parsed by small recursive descent parsers.' }
  ],
  cards: [
    ['Why remove left recursion?', 'A → A α makes recursive descent call itself forever.'],
    ['A → A α | β rewritten', 'A → β A′, A′ → α A′ | ε'],
    ['When is left factoring needed?', 'When alternatives share a common prefix, so one lookahead can’t choose.'],
    ['FIRST(α)', 'Set of terminals that can begin strings derived from α.'],
    ['FOLLOW(A)', 'Set of terminals that can appear immediately after A.'],
    ['LL(1) conflict', 'A table cell with two productions; the grammar is not LL(1).']
  ],
  quiz: [
    { q: 'For else_part → else statement | ε with else ∈ FOLLOW(else_part), M[else_part, else] has…', o: ['No entry', 'One entry', 'Two entries (conflict)', 'An error'], a: 2, why: 'The dangling-else conflict; resolved by choosing else statement.' },
    { q: 'EBNF for e → e op t | t is…', o: ['e → { op t }', 'e → t { op t }', 'e → t op e', 'e → op t e'], a: 1, why: 'Start with t, then zero or more "op t".' }
  ],
  tutorial: { no: 6, source: 'Tutorial-06-t31213.doc', items: [
    { n: 'D1', q: 'Eliminate left recursion and write EBNF: exp → exp + term | exp − term | term ; e → e op t | t.', a: `<pre><code>exp  → term exp′
exp′ → + term exp′ | - term exp′ | ε
EBNF: exp → term { ( + | - ) term }

e  → t e′
e′ → op t e′ | ε
EBNF: e → t { op t }</code></pre>` },
    { n: 'D2', q: 'When is left factoring required? Left-factor the loop-stmt grammar and write EBNF.', a: `<p>When two or more alternatives of a non-terminal begin with the same symbols, so a predictive parser can't choose with one lookahead.</p><pre><code>loop-stmt → loop statements loop-tail
loop-tail → while cond | until cond
EBNF: loop-stmt → loop statements ( while | until ) cond</code></pre>` },
    { n: 'D3', q: 'Left-factorise exp → id = num | id + num | id > num | id * num.', a: `<pre><code>exp  → id exp′
exp′ → = num | + num | > num | * num
id   → A
num  → [0-9]
(or: exp → id op num ; op → = | + | > | *)</code></pre>` },
    { n: 'D4', q: 'Compute FIRST and FOLLOW for the given grammar.', a: `<p>Here <code>{</code> and <code>}</code> are terminal tokens (program → { statement }).</p><table><tr><th>Non-terminal</th><th>FIRST</th><th>FOLLOW</th></tr><tr><td>program</td><td>{</td><td>$</td></tr><tr><td>statement</td><td>if, id</td><td>}, else</td></tr><tr><td>if_stmt</td><td>if</td><td>}, else</td></tr><tr><td>else_part</td><td>else, ε</td><td>}, else</td></tr><tr><td>assign_stmt</td><td>id</td><td>}, else</td></tr><tr><td>exp</td><td>0, 1</td><td>), }, else</td></tr></table><p><b>Why:</b> statement is followed by } in program and by FIRST(else_part) − ε = {else} in if_stmt; else_part can be ε, so FOLLOW(if_stmt) ⊆ FOLLOW(statement); FOLLOW(exp) gets ) from if_stmt and FOLLOW(assign_stmt).</p>` },
    { n: 'D5', q: 'Construct the top-down (LL(1)) parsing table.', a: `<div class="tablewrap"><table><tr><th></th><th>{</th><th>}</th><th>if</th><th>else</th><th>id</th><th>0</th><th>1</th></tr><tr><td>program</td><td>{ statement }</td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td>statement</td><td></td><td></td><td>if_stmt</td><td></td><td>assign_stmt</td><td></td><td></td></tr><tr><td>if_stmt</td><td></td><td></td><td>if ( exp ) statement else_part</td><td></td><td></td><td></td><td></td></tr><tr><td>else_part</td><td></td><td>ε</td><td></td><td>else statement <b>/ ε</b></td><td></td><td></td><td></td></tr><tr><td>assign_stmt</td><td></td><td></td><td></td><td></td><td>id = exp</td><td></td><td></td></tr><tr><td>exp</td><td></td><td></td><td></td><td></td><td></td><td>0</td><td>1</td></tr></table></div><p>M[else_part, else] has two entries: the <b>dangling-else</b> conflict. Resolve by always choosing <code>else statement</code> (else matches the nearest if).</p>` },
    { n: 'P1', kind: 'practical', q: 'Practical: write parse_program, parse_statement, … from the table; show non-terminals; save results (XML tags).', a: `<p>One procedure per non-terminal; <code>Select Case nextToken.kind</code> picks the production from the table row; terminals call <code>acceptToken</code>. To show blocks, add <code>lstResults.Items.Add("&lt;statement&gt;")</code> at the start and <code>"&lt;/statement&gt;"</code> at the end of each procedure; saving them gives an XML-like parse trace.</p>` }
  ] }
}
];
export default chapters;
