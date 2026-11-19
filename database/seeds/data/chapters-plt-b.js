/* Programming Language Translation (TCS3311 Compiler Design), topics 7-12.
   Notes written from standard compiler-design material (lecture slides not received). */
const NOTE = '<p class="tip"><b>About these notes:</b> written from standard compiler-design material for this tutorial topic, because the lecture slides were not in your files. Check them against your lecturer’s slides when you get them.</p>';

const chapters = [
{
  id: 'plt7', subject: 'plt', num: 7, theme: 'front', title: 'Bottom-up parsing', short: 'Bottom-up parsing',
  lecture: 'Tutorial-07 topic: Bottom-up Parsing',
  summary: 'Shift-reduce parsing with a stack, handles, reversing a rightmost derivation, LR(0) items and the item DFA, building an LR parsing table, and the shift-reduce and reduce-reduce conflicts.',
  sections: [
    { h: 'Shift-reduce parsing', pics: [{ cards: [{ t: 'Shift', s: 'Push next input token', c: 'p' }, { t: 'Reduce', s: 'Replace handle with LHS', c: 't' }, { t: 'Accept', s: 'Stack = start symbol, input empty', c: 'g' }, { t: 'Error', s: 'No valid action', c: 'r' }], cols: 2, title: 'Four actions' }], body: NOTE + `
      <p>Bottom-up parsers start from the input and reduce it to the start symbol, which traces a <b>rightmost derivation in reverse</b>. A <b>handle</b> is a substring matching the RHS of a production whose reduction is a step of that derivation.</p>` },
    { h: 'LR(0) items and the item DFA', pics: [{ flow: [['Augment', 'S′ → S'], ['Closure', 'Add B → •γ for every •B'], ['Goto(I, X)', 'Move the dot over X'], ['States', 'Sets of items = DFA']], color: 'c', title: 'Building the LR(0) automaton' }], body: `
      <p>An <b>item</b> is a production with a dot showing how much has been seen: <code>A → α • β</code>. The DFA's states are sets of items. An item with the dot at the end (<code>A → α •</code>) means "reduce by A → α".</p>` },
    { h: 'LR parsing table', body: `
      <ul><li><b>ACTION[state, terminal]</b>: shift s<sub>n</sub>, reduce r<sub>k</sub>, accept, or error.</li><li><b>GOTO[state, non-terminal]</b>: next state after a reduction.</li><li><b>LR(0)</b> reduces on every input; <b>SLR(1)</b> reduces only on terminals in FOLLOW(A); <b>LALR(1)</b> (Yacc, Bison, Java CUP) and <b>LR(1)</b> use precise lookaheads.</li><li><b>Conflicts</b>: shift-reduce (e.g. dangling else; Yacc chooses shift) and reduce-reduce.</li></ul>` }
  ],
  links: [
    { to: 'plt6', topic: 'Top-down vs bottom-up', text: 'Top-down (Topic 6) predicts; bottom-up reduces and handles left recursion.' },
    { to: 'plt4', topic: 'DFA', text: 'The LR item automaton is a DFA, like scanners (Topic 4).' },
    { to: 'plt10', topic: 'Java CUP', text: 'Java CUP (Tutorials 10–12) is an LALR parser generator.' }
  ],
  mindmaps: [{ center: 'Bottom-up', branches: [
    { label: 'Shift-reduce', color: 'p', kids: ['Shift, reduce', 'Accept, error', 'Reverse rightmost'] },
    { label: 'Handles', color: 'p', kids: ['RHS on stack top', 'Correct reduction'] },
    { label: 'LR items', color: 'c', kids: ['A → α • β', 'Closure, goto', 'Item DFA'] },
    { label: 'Tables', color: 't', kids: ['ACTION', 'GOTO', 'LR(0), SLR, LALR'] },
    { label: 'Conflicts', color: 'r', kids: ['Shift-reduce', 'Reduce-reduce'] }
  ] }],
  cases: [
    { co: 'PostgreSQL', logo: 'PG', color: 't', year: 'ongoing', title: 'SQL parsed by Bison', story: 'PostgreSQL’s SQL grammar is written as a Bison (Yacc-compatible) file and compiled into an LALR(1) parser.', lesson: 'LR parser generators are still used for large, real grammars.' },
    { co: 'Yacc', logo: 'YC', color: 'p', year: '1975', title: 'Yet Another Compiler-Compiler', story: 'Stephen Johnson’s Yacc at Bell Labs generated LALR parsers from grammars and was used to build many Unix languages and tools.', lesson: 'Bottom-up parsing made practical by tools.' }
  ],
  code: [
    { title: 'Shift-reduce trace for S → aABe', lang: 'Python', explain: 'A tiny shift-reduce parser for Tutorial 7 Q1 that prints the stack, remaining input and action.', src: String.raw`RULES = [("S", "aABe"), ("A", "Abc"), ("A", "b"), ("B", "d")]

def parse(w):
    stack, inp = "", w + "$"
    while True:
        # reduce A -> b only when the next symbol is not 'c' (otherwise Abc is the handle)
        for lhs, rhs in RULES:
            if stack.endswith(rhs) and not (rhs == "b" and stack.endswith("Ab") and inp[0] == "c"):
                print(f"{stack:8} {inp:10} reduce {lhs} -> {rhs}")
                stack = stack[: -len(rhs)] + lhs
                break
        else:
            if stack == "S" and inp == "$":
                print(f"{stack:8} {inp:10} accept"); return
            print(f"{stack:8} {inp:10} shift {inp[0]}")
            stack, inp = stack + inp[0], inp[1:]

parse("abbcbcde")` }
  ],
  beyond: [
    { skill: 'dsa', why: 'Stacks drive both shift-reduce parsing and expression evaluation.' },
    { skill: 'sql', why: 'Every SQL statement you write is parsed by an LR or recursive-descent parser in the database.' }
  ],
  cards: [
    ['Handle', 'A substring matching a production’s RHS whose reduction is a step of the reverse rightmost derivation.'],
    ['Four shift-reduce actions', 'Shift, reduce, accept, error.'],
    ['LR(0) item', 'A production with a dot: A → α • β.'],
    ['SLR vs LR(0)', 'SLR reduces only on lookaheads in FOLLOW(A).'],
    ['Shift-reduce conflict example', 'Dangling else; Yacc resolves by shifting.']
  ],
  quiz: [
    { q: 'Bottom-up parsing traces…', o: ['A leftmost derivation', 'A rightmost derivation in reverse', 'Only parse trees', 'FIRST sets'], a: 1, why: 'It reduces the input back to the start symbol.' },
    { q: 'Java CUP generates which kind of parser?', o: ['LL(1)', 'Recursive descent', 'LALR(1)', 'LR(0)'], a: 2, why: 'Like Yacc and Bison.' }
  ],
  tutorial: { no: 7, source: 'Tutorial-07-t31213.doc', items: [
    { n: 'D1', q: 'Stack implementation of the shift-reduce parser for abbcbcde with S → aABe, A → Abc | b, B → d.', a: `<table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>$</td><td>abbcbcde$</td><td>shift a</td></tr><tr><td>$a</td><td>bbcbcde$</td><td>shift b</td></tr><tr><td>$ab</td><td>bcbcde$</td><td>reduce A → b</td></tr><tr><td>$aA</td><td>bcbcde$</td><td>shift b</td></tr><tr><td>$aAb</td><td>cbcde$</td><td>shift c (handle is Abc, not b)</td></tr><tr><td>$aAbc</td><td>bcde$</td><td>reduce A → Abc</td></tr><tr><td>$aA</td><td>bcde$</td><td>shift b</td></tr><tr><td>$aAb</td><td>cde$</td><td>shift c</td></tr><tr><td>$aAbc</td><td>de$</td><td>reduce A → Abc</td></tr><tr><td>$aA</td><td>de$</td><td>shift d</td></tr><tr><td>$aAd</td><td>e$</td><td>reduce B → d</td></tr><tr><td>$aAB</td><td>e$</td><td>shift e</td></tr><tr><td>$aABe</td><td>$</td><td>reduce S → aABe</td></tr><tr><td>$S</td><td>$</td><td>accept</td></tr></table>` },
    { n: 'D2(i)', q: 'Step-by-step derivation of while ( 1 < 2 ) { A = 2 ; 3 ; } from stat → while cond expr …', a: `<pre><code>stat ⇒ while cond expr
     ⇒ while ( num op num ) expr
     ⇒ while ( 1 < 2 ) expr
     ⇒ while ( 1 < 2 ) { expr
     ⇒ while ( 1 < 2 ) { id = expr
     ⇒ while ( 1 < 2 ) { A = num expr
     ⇒ while ( 1 < 2 ) { A = 2 ; expr
     ⇒ while ( 1 < 2 ) { A = 2 ; num expr
     ⇒ while ( 1 < 2 ) { A = 2 ; 3 ; expr
     ⇒ while ( 1 < 2 ) { A = 2 ; 3 ; }</code></pre><p>Uses expr → { expr, id = expr, num expr, ; expr and } in turn.</p>` },
    { n: 'D2(ii)', q: 'Walk-through of a bottom-up parser for the same input.', a: `<p>Work backwards (each step reduces a handle):</p><pre><code>while ( 1 < 2 ) { A = 2 ; 3 ; }
→ while ( num op num ) { id = num ; num ; }    tokens: num, op, id
→ while cond { id = num ; num ; }              cond → ( num op num )
→ while cond { id = num ; num ; expr           expr → }
→ while cond { id = num ; num expr             expr → ; expr
→ while cond { id = num ; expr                 expr → num expr
→ while cond { id = num expr                   expr → ; expr
→ while cond { id = expr                       expr → num expr
→ while cond { expr                            expr → id = expr
→ while cond expr                              expr → { expr
→ stat                                         stat → while cond expr</code></pre>` },
    { n: 'D3', q: 'Draw the LR(0) DFA for program → { declaration statement }, declaration → type id ;, statement → id = exp ;, type → int | float, exp → 0 | 1.', a: `<p>Augment with S′ → program. States:</p><pre><code>I0: S′→•program   program→•{ declaration statement }
I1: S′→program•                                   (accept)
I2: program→{ •declaration statement }   declaration→•type id ;
    type→•int   type→•float
I3: program→{ declaration •statement }   statement→•id = exp ;
I4: declaration→type •id ;
I5: type→int•        I6: type→float•
I7: program→{ declaration statement •}
I8: statement→id •= exp ;
I9: declaration→type id •;
I10: program→{ declaration statement }•
I11: statement→id = •exp ;   exp→•0   exp→•1
I12: declaration→type id ;•
I13: statement→id = exp •;
I14: exp→0•          I15: exp→1•
I16: statement→id = exp ;•

Edges: I0-program→I1, I0-{→I2, I2-declaration→I3, I2-type→I4,
I2-int→I5, I2-float→I6, I3-statement→I7, I3-id→I8, I4-id→I9,
I7-}→I10, I8-=→I11, I9-;→I12, I11-exp→I13, I11-0→I14, I11-1→I15, I13-;→I16</code></pre>` },
    { n: 'D4', q: 'Build the LR table and show the parser on { int a; a = 1; }.', a: `<p>Productions: 1 program, 2 declaration, 3 statement, 4 type→int, 5 type→float, 6 exp→0, 7 exp→1. Shifts follow the edges above; reduce states: I5 r4, I6 r5, I10 r1, I12 r2, I14 r6, I15 r7, I16 r3; I1 accept on $.</p><table><tr><th>Stack</th><th>Input</th><th>Action</th></tr><tr><td>0</td><td>{ int id ; id = 1 ; } $</td><td>s2</td></tr><tr><td>0 { 2</td><td>int id ; …</td><td>s5</td></tr><tr><td>0 { 2 int 5</td><td>id ; …</td><td>r4 type→int, goto 4</td></tr><tr><td>0 { 2 type 4</td><td>id ; …</td><td>s9</td></tr><tr><td>… type 4 id 9</td><td>; id …</td><td>s12</td></tr><tr><td>… id 9 ; 12</td><td>id = 1 ; } $</td><td>r2 declaration, goto 3</td></tr><tr><td>0 { 2 decl 3</td><td>id = 1 ; } $</td><td>s8</td></tr><tr><td>… id 8</td><td>= 1 ; } $</td><td>s11</td></tr><tr><td>… = 11</td><td>1 ; } $</td><td>s15</td></tr><tr><td>… 1 15</td><td>; } $</td><td>r7 exp→1, goto 13</td></tr><tr><td>… exp 13</td><td>; } $</td><td>s16</td></tr><tr><td>… ; 16</td><td>} $</td><td>r3 statement, goto 7</td></tr><tr><td>0 { 2 decl 3 stmt 7</td><td>} $</td><td>s10</td></tr><tr><td>… } 10</td><td>$</td><td>r1 program, goto 1</td></tr><tr><td>0 program 1</td><td>$</td><td>accept</td></tr></table>` },
    { n: 'P1', kind: 'practical', q: 'Practical: generate a parse tree with a TreeView; mark extra tokens and syntax-error location.', a: `<p>Pass a TreeNode into every parse procedure; each non-terminal adds a child node; acceptToken adds the token as a leaf. After parse_program, if nextToken isn't EOF, add an error node "extra tokens". On a syntax error, add a red node "error here: &lt;token&gt;" under the current node.</p>` }
  ] }
},
{
  id: 'plt8', subject: 'plt', num: 8, theme: 'middle', title: 'Syntax-directed translation', short: 'Syntax-directed translation',
  lecture: 'Tutorial-08 topic: Syntax-directed Translation',
  summary: 'Syntax-directed definitions (SDDs), synthesized and inherited attributes, annotated parse trees, dependency graphs and evaluation order, S-attributed and L-attributed SDDs, building syntax trees, and JLex for scanner generation.',
  sections: [
    { h: 'Syntax-directed definitions', pics: [{ compare: { a: { title: 'Synthesized attribute', color: 'p', items: ['Computed from children', 'Flows UP the tree', 'e.g. E.val = E1.val + T.val'] }, b: { title: 'Inherited attribute', color: 't', items: ['From parent or siblings', 'Flows DOWN / sideways', 'e.g. declared type to ids'] } }, title: 'Attributes' }], body: NOTE + `
      <p>An SDD attaches <b>attributes</b> to grammar symbols and <b>semantic rules</b> to productions, e.g. <code>E → E1 + T { E.val = E1.val + T.val }</code>. An <b>annotated parse tree</b> shows the attribute values at each node.</p>` },
    { h: 'Dependency graphs and evaluation order', body: `
      <p>A <b>dependency graph</b> has an edge from attribute a to b if b's rule uses a. Any <b>topological order</b> of the graph is a valid evaluation order. Cycles mean the SDD can't be evaluated.</p>
      <ul><li><b>S-attributed</b>: only synthesized attributes; evaluate bottom-up (post-order), ideal for LR parsers.</li><li><b>L-attributed</b>: inherited attributes may depend only on the parent's inherited attributes and siblings to the <b>left</b>; evaluate in one left-to-right depth-first pass, ideal for top-down parsers.</li></ul>` },
    { h: 'Building syntax trees', pics: [{ tree: { root: '*', kids: [{ label: '+', kids: ['3', '4'] }, { label: '+', kids: ['5', '6'] }] }, color: 't', title: 'Syntax tree for (3 + 4) * (5 + 6)' }], body: `
      <p>SDDs can build an <b>abstract syntax tree</b> instead of computing values: <code>E → E1 + T { E.node = new Node('+', E1.node, T.node) }</code>. Syntax trees drop punctuation like parentheses and are the input to later phases.</p>` },
    { h: 'JLex', body: `
      <p>JLex (like Lex/Flex) reads a <code>.lex</code> file of regular expressions with Java actions and generates a scanner class (<code>Yylex</code>). Tutorial 8–9 practicals build and run it; Tutorial 11 connects it to a Java CUP parser.</p>` }
  ],
  links: [
    { to: 'plt9', topic: 'Type checking with attributes', text: 'Semantic analysis (Topic 9) uses attributes for types.' },
    { to: 'plt10', topic: 'Translation to IR', text: 'SDDs generate three-address code in Topic 10.' }
  ],
  mindmaps: [{ center: 'SDT', branches: [
    { label: 'SDD', color: 'p', kids: ['Attributes', 'Semantic rules', 'Annotated tree'] },
    { label: 'Attributes', color: 't', kids: ['Synthesized: up', 'Inherited: down'] },
    { label: 'Order', color: 'c', kids: ['Dependency graph', 'Topological order', 'No cycles'] },
    { label: 'Classes', color: 'a', kids: ['S-attributed', 'L-attributed'] },
    { label: 'Uses', color: 'g', kids: ['Evaluate', 'Build syntax tree', 'Generate code'] }
  ] }],
  cases: [
    { co: 'Spreadsheets', logo: 'XL', color: 'g', year: 'everyday', title: 'Dependency graphs', story: 'When you change a cell, a spreadsheet recalculates only the cells that depend on it, in an order that respects their dependencies.', lesson: 'Same idea as evaluating attributes in topological order.' },
    { co: 'Babel', logo: 'BB', color: 'p', year: '2014→', title: 'Tree transformations', story: 'Babel parses modern JavaScript into a syntax tree, transforms it with plugins, and prints older JavaScript that runs in more browsers.', lesson: 'Syntax-directed translation on real code.' }
  ],
  code: [
    { title: 'Evaluate the SDD and print the annotated tree', lang: 'Python', explain: 'Implements L → E n with E.val, T.val, F.val synthesized attributes and prints each node’s value.', src: String.raw`import re

def parse(text):
    toks = re.findall(r"\d|[+*()]", text) + ["$"]
    i = 0
    def peek(): return toks[i]
    def eat():
        nonlocal i; i += 1; return toks[i - 1]
    def E(d):
        v = T(d + 1)
        while peek() == "+":
            eat(); t = T(d + 1); print("  " * d + f"E.val = {v} + {t} = {v + t}"); v += t
        return v
    def T(d):
        v = F(d + 1)
        while peek() == "*":
            eat(); f = F(d + 1); print("  " * d + f"T.val = {v} * {f} = {v * f}"); v *= f
        return v
    def F(d):
        if peek() == "(":
            eat(); v = E(d + 1); eat(); return v
        v = int(eat()); print("  " * d + f"F.val = digit.lexval = {v}"); return v
    return E(0)

for e in ["(3+4)*(5+6)", "1*2*(3+4+5)", "(8*(7+6)+(5*4))"]:
    print(e, "=", parse(e), "\n")` }
  ],
  beyond: [
    { skill: 'frameworks', why: 'React’s JSX is turned into JavaScript by a syntax-directed translator.' },
    { skill: 'dsa', why: 'Topological sorting of a dependency graph is a standard graph algorithm (also used by build tools).' }
  ],
  cards: [
    ['Synthesized attribute', 'Computed from the attributes of a node’s children.'],
    ['Inherited attribute', 'Computed from the parent and/or siblings.'],
    ['Annotated parse tree', 'A parse tree showing attribute values at each node.'],
    ['Dependency graph', 'Edges show which attributes each attribute needs; evaluate in topological order.'],
    ['L-attributed SDD', 'Inherited attributes depend only on the parent’s inherited attributes and left siblings.']
  ],
  quiz: [
    { q: 'An SDD with only synthesized attributes is…', o: ['L-attributed only', 'S-attributed', 'Cyclic', 'Inherited'], a: 1, why: 'S-attributed; evaluate bottom-up.' },
    { q: 'L.val for (3 + 4) * (5 + 6) n is…', o: ['18', '35', '77', '64'], a: 2, why: '7 × 11 = 77.' }
  ],
  tutorial: { no: 8, source: 'Tutorial-08-t31213.doc', items: [
    { n: 'D1', q: 'Draw annotated parse trees for (3 + 4) * (5 + 6) n, 1 * 2 * (3 + 4 + 5) n, (8 * (7 + 6) + (5 * 4)) n.', a: `<p><b>(a)</b> Leaves F.val = 3, 4, 5, 6. Inner E.val = 3 + 4 = <b>7</b> and 5 + 6 = <b>11</b>; F.val (parentheses) = 7 and 11; T.val = 7 * 11 = <b>77</b>; E.val = 77; <b>L.val = 77</b>.</p><pre><code>L.val=77
└ E.val=77 ── T.val=77
   ├ T.val=7 ─ F.val=7 ─ ( E.val=7 = E.val=3 + T.val=4 )
   └ * F.val=11 ─ ( E.val=11 = E.val=5 + T.val=6 )</code></pre><p><b>(b)</b> T.val = 1 * 2 = 2; inner E.val = 3 + 4 = 7, then 7 + 5 = 12; T.val = 2 * 12 = 24; <b>L.val = 24</b>.</p><p><b>(c)</b> 7 + 6 = 13; 8 * 13 = 104; 5 * 4 = 20; 104 + 20 = 124; <b>L.val = 124</b>.</p>` },
    { n: 'D2', q: 'Draw the dependency graphs for each expression.', a: `<p>Every node's <code>val</code> depends on its children's <code>val</code> (all attributes are synthesized), so arrows point <b>up</b> from each digit.lexval → F.val → T.val → E.val → … → L.val. Example (a): 3,4 → E.val=7 → F.val=7 → T.val=77 ← F.val=11 ← E.val=11 ← 5,6; then T.val=77 → E.val=77 → L.val=77. A post-order traversal is a valid evaluation order.</p>` },
    { n: 'D3', q: 'Difference between synthesized and inherited attributes?', a: `<p><b>Synthesized</b>: value at a node computed from its <b>children</b> (information flows up; e.g. E.val). <b>Inherited</b>: value computed from the <b>parent or siblings</b> (flows down/sideways; e.g. passing a declared type to each identifier in <code>int a, b, c</code>).</p>` },
    { n: 'D4', q: 'Discuss the use of SDDs in constructing syntax trees.', a: `<p>Give each production a rule that creates a node: <code>E → E1 + T { E.node = new Node('+', E1.node, T.node) }</code>, <code>F → ( E ) { F.node = E.node }</code>, <code>F → digit { F.node = new Leaf(num, digit.lexval) }</code>. The synthesized attribute <code>node</code> builds the tree bottom-up, dropping punctuation; later phases work on this tree.</p>` },
    { n: 'D5', q: 'What is an L-attributed SDD?', a: `<p>An SDD where each inherited attribute of a symbol X<sub>i</sub> in A → X<sub>1</sub>…X<sub>n</sub> depends only on the inherited attributes of A and attributes of X<sub>1</sub>…X<sub>i−1</sub> (symbols to its <b>left</b>). It can be evaluated in one left-to-right depth-first pass, so it fits top-down parsing. Every S-attributed SDD is also L-attributed.</p>` },
    { n: 'P1', kind: 'practical', q: 'Practical: generate a Java scanner with JLex (e.lex); add arithmetic and relational operators.', a: `<p>Add rules to the JLex rules section, for example:</p><pre><code>"+"   { return new Yytoken(PLUS, yytext()); }
"-"   { return new Yytoken(MINUS, yytext()); }
"*" | "/"          { return new Yytoken(MULOP, yytext()); }
"<" | "<=" | ">" | ">=" | "==" | "!="  { return new Yytoken(RELOP, yytext()); }</code></pre><p>Rerun JLex, copy the generated e.lex.java into the project and run.</p>` }
  ] }
},
{
  id: 'plt9', subject: 'plt', num: 9, theme: 'middle', title: 'Semantic analysis', short: 'Semantic analysis',
  lecture: 'Tutorial-09 topic: Semantic Analysis',
  summary: 'Scopes and scope rules, symbol tables (entries, scoped tables), type expressions and type checking, implicit and explicit type conversion, and writing type-checking rules for a grammar.',
  sections: [
    { h: 'Scope', pics: [{ cards: [{ t: 'Global', s: 'Whole program / file', c: 'p' }, { t: 'Class', s: 'Fields and methods', c: 't' }, { t: 'Method', s: 'Parameters, locals', c: 'c' }, { t: 'Block', s: 'Inside { } or loops', c: 'a' }], cols: 2, title: 'Nested scopes' }], body: NOTE + `
      <p>The scope of a declaration is the part of the program where it is visible. Most languages use <b>static (lexical) scope</b> with nesting: look up a name in the innermost scope first, then outward. Implement with a <b>stack of symbol tables</b>: push on entering a block, pop on leaving; report "undeclared" if not found in any, "redeclared" if a name already exists in the current scope.</p>` },
    { h: 'Symbol table', body: `
      <p>Each entry stores the <b>name</b>, <b>kind</b> (class, field, method, parameter, local), <b>type</b>, <b>scope level</b>, modifiers, and storage information (offset, size). Usually a hash table per scope.</p>` },
    { h: 'Type checking', pics: [{ cards: [{ t: 'Basic types', s: 'int, bool, char, float', c: 'p' }, { t: 'Constructed', s: 'array(n, T), pointer(T), T1 × T2 → T', c: 't' }, { t: 'Static checking', s: 'At compile time', c: 'g' }, { t: 'Dynamic checking', s: 'At run time', c: 'a' }], cols: 2, title: 'Type expressions' }], body: `
      <p>The checker computes each expression's type from the symbol table and rules, and reports mismatches (adding int to bool, calling with wrong arguments, indexing a non-array).</p>
      <p><b>Type conversion</b>: <b>implicit</b> (coercion) done by the compiler, e.g. <code>double d = 5;</code> widens int to double; <b>explicit</b> (cast) written by the programmer, e.g. <code>int n = (int) 3.9;</code>.</p>` }
  ],
  links: [
    { to: 'plt8', topic: 'Attributes for types', text: 'Type rules are semantic rules on attributes (Topic 8).' },
    { to: 'plt2', topic: 'Semantic rules', text: 'Topic 2 listed the rules this phase checks.' },
    { to: 'ch6', topic: 'Strong typing', text: 'Software QA Ch 6: strongly typed languages (Ada) catch faults at compile time. This is the phase that does it.' }
  ],
  mindmaps: [{ center: 'Semantic analysis', branches: [
    { label: 'Scope', color: 'p', kids: ['Global, class', 'Method, block', 'Innermost first'] },
    { label: 'Symbol table', color: 'p', kids: ['Name, kind, type', 'Scope level', 'Stack of tables'] },
    { label: 'Types', color: 't', kids: ['Basic', 'array, pointer, function'] },
    { label: 'Checking', color: 'c', kids: ['Static vs dynamic', 'Errors: mismatch, undeclared'] },
    { label: 'Conversion', color: 'a', kids: ['Implicit coercion', 'Explicit cast'] }
  ] }],
  cases: [
    { co: 'TypeScript', logo: 'TS', color: 'p', year: '2012→', title: 'Types for JavaScript', story: 'TypeScript adds static type checking to JavaScript. Its compiler reports type errors before the code runs and then outputs plain JavaScript.', lesson: 'Static semantic analysis catches bugs early.' },
    { co: 'Rust', logo: 'RS', color: 'c', year: '2015→', title: 'Borrow checker', story: 'Rust’s compiler checks ownership and lifetimes during semantic analysis, rejecting programs with certain memory-safety bugs before they run.', lesson: 'Semantic analysis can enforce safety rules, not only types.' },
    { co: 'Mars Climate Orbiter', logo: 'MCO', color: 'r', year: '1999', title: 'Units are types too', story: 'A units mismatch between two pieces of software (pound-force vs newton seconds) caused the loss of the spacecraft.', lesson: 'Some languages (e.g. F# units of measure) let the type checker catch unit errors.' }
  ],
  code: [
    { title: 'Scoped symbol table', lang: 'Python', explain: 'Stack of dictionaries: declare in the current scope, look up innermost-first, report errors.', src: String.raw`class SymbolTable:
    def __init__(self):
        self.scopes = [{}]                  # global scope
    def enter(self): self.scopes.append({})
    def leave(self): self.scopes.pop()
    def declare(self, name, **info):
        if name in self.scopes[-1]:
            raise NameError(f"'{name}' already declared in this scope")
        self.scopes[-1][name] = info
    def lookup(self, name):
        for scope in reversed(self.scopes):
            if name in scope:
                return scope[name]
        raise NameError(f"'{name}' is not declared")

st = SymbolTable()
st.declare("Main", kind="class")
st.enter()                                   # class scope
st.declare("next_char", kind="field", type="int", mod="protected")
st.declare("main", kind="method", type="void", mod="static public")
st.enter()                                   # method scope
st.declare("args", kind="param", type="String[]")
st.declare("i", kind="local", type="int")
print(st.lookup("next_char"))                 # found in an outer scope
st.leave(); st.leave()` },
    { title: 'Type checker for the Tutorial 9 grammar', lang: 'Python', explain: 'Checks declarations, assignments and if statements for int, bool and array types.', src: String.raw`env = {}

def decl(name, t):                 # Var_decl -> id : Type_exp
    env[name] = t

def type_of(e):
    if isinstance(e, bool): return "bool"
    if isinstance(e, int): return "int"
    if isinstance(e, str): return env.get(e, "error")
    op, a, b = e
    ta, tb = type_of(a), type_of(b)
    if op in "+-*" and ta == tb == "int": return "int"
    if op in "<>" and ta == tb == "int": return "bool"
    return "error"

def check_assign(name, e):          # Stmt -> id = exp
    return "void" if env.get(name) == type_of(e) else "type_error"

def check_if(cond, stmt_type):      # Stmt -> if exp then Stmt
    return stmt_type if type_of(cond) == "bool" else "type_error"

decl("x", "int"); decl("ok", "bool"); decl("a", ("array", 10, "int"))
print(check_assign("x", ("+", "x", 1)))                    # void
print(check_assign("ok", ("+", "x", 1)))                   # type_error
print(check_if(("<", "x", 5), check_assign("x", 0)))       # void` }
  ],
  beyond: [
    { skill: 'oop', why: 'Scope rules explain private, protected and public visibility in classes.' },
    { skill: 'testing', why: 'Static type checkers (TypeScript, mypy) catch a whole class of bugs before tests even run.' }
  ],
  cards: [
    ['Static (lexical) scope', 'Name resolved from the program text: innermost enclosing declaration wins.'],
    ['Symbol table entry fields', 'Name, kind, type, scope level, modifiers, storage (offset/size).'],
    ['Implicit vs explicit conversion', 'Implicit: compiler coerces (int → double). Explicit: programmer casts ((int) 3.9).'],
    ['Type expression for an int array of 10', 'array(10, int)']
  ],
  quiz: [
    { q: 'double d = 5; in Java is an example of…', o: ['Explicit cast', 'Implicit conversion (widening)', 'Type error', 'Dynamic scope'], a: 1, why: 'The compiler widens int to double.' },
    { q: 'Using a variable declared in an inner block after the block ends is…', o: ['Valid', 'An undeclared-identifier error', 'A lexical error', 'A linker error'], a: 1, why: 'Its scope ended with the block.' }
  ],
  tutorial: { no: 9, source: 'Tutorial-09-t31213.doc', items: [
    { n: 'D1', q: 'Discuss the different scopes for identifiers and how scope rules can be implemented.', a: `<p>Scopes: global (file/program), class (fields, methods), method (parameters, locals), block (inside braces, loop bodies). With static scope, a name refers to its nearest enclosing declaration. Implement with a stack of symbol tables: push on block entry, pop on exit; declare into the top table (error if already there); look up from top to bottom (error if not found).</p>` },
    { n: 'D2', q: 'Explain the symbol table for class Main { protected int next_char = -2; static public void main(String[] args) { int i = 0; do { i = i + next_char; } while (i > -100); } }', a: `<table><tr><th>Name</th><th>Kind</th><th>Type</th><th>Scope</th><th>Other</th></tr><tr><td>Main</td><td>class</td><td>—</td><td>global</td><td></td></tr><tr><td>next_char</td><td>field</td><td>int</td><td>class Main</td><td>protected, init −2</td></tr><tr><td>main</td><td>method</td><td>String[] → void</td><td>class Main</td><td>static public</td></tr><tr><td>args</td><td>parameter</td><td>String[]</td><td>method main</td><td></td></tr><tr><td>i</td><td>local variable</td><td>int</td><td>method main</td><td>init 0</td></tr></table><p>Inside the loop, <code>i</code> is found in the method scope and <code>next_char</code> in the class scope.</p>` },
    { n: 'D3', q: 'Illustrate how the symbol table is used for type checking.', a: `<p>For <code>i = i + next_char;</code>: look up <code>i</code> → int, <code>next_char</code> → int; <code>int + int</code> → int; assignment target <code>i</code> is int, so types match ✓. For <code>i > -100</code>: int > int → boolean, valid as a do-while condition ✓. If <code>next_char</code> were a String, the lookup would give String and the checker would report "operator + cannot be applied to int and String" (or concatenate, in Java).</p>` },
    { n: 'D4', q: 'Examples of implicit and explicit type conversion.', a: `<ul><li><b>Implicit</b>: <code>double d = 5;</code> (int → double); <code>long n = 10;</code>; <code>3 + 2.5</code> → 5.5 (int promoted to double); in C, <code>char c = 'A'; int x = c;</code>.</li><li><b>Explicit</b>: <code>int n = (int) 3.9;</code> → 3; <code>(float) total / count</code>; <code>Integer.parseInt("42")</code>.</li></ul>` },
    { n: 'D5', q: 'Write type-checking rules for the given CFG.', a: `<pre><code>Program   → Var_decls ; Stmts   { Program.type = Stmts.type }
Var_decl  → id : Type_exp       { addtype(id.entry, Type_exp.type) }
Type_exp  → int                 { Type_exp.type = integer }
Type_exp  → bool                { Type_exp.type = boolean }
Type_exp  → array [num] of T1   { Type_exp.type = array(num.val, T1.type) }
Stmts     → Stmts1 ; Stmt       { Stmts.type = (Stmts1.type == void and Stmt.type == void)
                                                ? void : type_error }
Stmt      → if exp then Stmt1   { Stmt.type = (exp.type == boolean) ? Stmt1.type : type_error }
Stmt      → id = exp            { Stmt.type = (lookup(id).type == exp.type) ? void : type_error }</code></pre>` },
    { n: 'P1', kind: 'practical', q: 'Practical: extend the JLex scanner to read an input file and write tokens to an output file.', a: `<p>Open a <code>FileInputStream</code> on the input file and construct the scanner with it: <code>Yylex yy = new Yylex(fin);</code>. Loop on <code>yy.yylex()</code> until it returns null, writing each token with a <code>PrintWriter</code> to an output file. Close both streams in <code>finally</code>.</p>` }
  ] }
},
{
  id: 'plt10', subject: 'plt', num: 10, theme: 'middle', title: 'Intermediate code generation', short: 'Intermediate code',
  lecture: 'Tutorial-10 topic: Intermediate Code Generation',
  summary: 'Why compilers use intermediate code, forms of IR (syntax trees, postfix, three-address code), translating expressions to three-address code, and implementing it as quadruples, triples and indirect triples. Practical: Java CUP parser generator.',
  sections: [
    { h: 'Why intermediate code?', pics: [{ compare: { a: { title: 'Advantages', color: 'g', items: ['Retarget: new back end only', 'Machine-independent optimisation', 'Simpler than machine code', 'Portability (bytecode)'] }, b: { title: 'Disadvantages', color: 'r', items: ['Extra phase: slower compile', 'More memory', 'Final code may be less tuned'] } }, title: 'Intermediate code' }], body: NOTE },
    { h: 'Three-address code', pics: [{ cards: [{ t: 'x = y op z', s: 'Binary operation', c: 'p' }, { t: 'x = op y', s: 'Unary (minus, not)', c: 'p' }, { t: 'x = y', s: 'Copy', c: 't' }, { t: 'goto L / if x goto L', s: 'Jumps', c: 't' }, { t: 'param x / call p, n', s: 'Procedure calls', c: 'c' }, { t: 'x = y[i] / x[i] = y', s: 'Arrays', c: 'c' }], cols: 2, title: 'Three-address instructions' }], body: `
      <p>Each instruction has at most <b>one operator on the right</b> and at most three addresses. Complex expressions are broken into steps with <b>temporaries</b> t1, t2, …</p>` },
    { h: 'Quadruples, triples, indirect triples', body: `
      <ul><li><b>Quadruple</b>: (op, arg1, arg2, result). Temporaries named explicitly; easy to move instructions.</li><li><b>Triple</b>: (op, arg1, arg2); results referred to by position <code>(n)</code>. Saves space, but moving an instruction changes references.</li><li><b>Indirect triples</b>: a separate list of pointers to triples; reorder the pointer list without changing the triples.</li></ul>` }
  ],
  links: [
    { to: 'plt8', topic: 'SDT generates IR', text: 'Translation rules from Topic 8 emit three-address code.' },
    { to: 'plt11', topic: 'Optimise the IR', text: 'Topic 11 optimises this three-address code.' },
    { to: 'plt1', topic: 'Why IR', text: 'Introduced in Topic 1.' }
  ],
  mindmaps: [{ center: 'Intermediate code', branches: [
    { label: 'Why', color: 'g', kids: ['Retargeting', 'Optimise once', 'Portability'] },
    { label: 'Forms', color: 'p', kids: ['Syntax tree', 'Postfix', 'Three-address code'] },
    { label: 'TAC', color: 't', kids: ['One operator', 'Temporaries', 'Jumps, calls'] },
    { label: 'Implementations', color: 'c', kids: ['Quadruples', 'Triples', 'Indirect triples'] }
  ] }],
  cases: [
    { co: 'LLVM', logo: 'LL', color: 'p', year: '2003→', title: 'One IR, many languages', story: 'Clang (C/C++), Swift and Rust compile to LLVM IR, which LLVM optimises and turns into code for x86, ARM and more.', lesson: 'IR lets many front ends share one optimiser and many back ends.' },
    { co: 'WebAssembly', logo: 'WA', color: 't', year: '2017→', title: 'Portable bytecode for the web', story: 'C, C++, Rust and others compile to WebAssembly, a compact stack-based IR that browsers compile to native code.', lesson: 'Intermediate code as a portable distribution format.' }
  ],
  code: [
    { title: 'Generate three-address code and quadruples', lang: 'Python', explain: 'Walks an expression tree, emits TAC with temporaries, and prints quadruples and triples.', src: String.raw`import itertools

def gen(tree):
    code, temps = [], itertools.count(1)
    def walk(n):
        if isinstance(n, str):
            return n
        if n[0] == "neg":
            a = walk(n[1]); t = f"t{next(temps)}"
            code.append(("uminus", a, "", t)); return t
        op, l, r = n
        a, b = walk(l), walk(r); t = f"t{next(temps)}"
        code.append((op, a, b, t)); return t
    walk(tree)
    return code

# -(a + b) * (b + c + d) + (a + c)
tree = ("+", ("*", ("neg", ("+", "a", "b")), ("+", ("+", "b", "c"), "d")), ("+", "a", "c"))
quads = gen(tree)
for i, (op, a, b, r) in enumerate(quads):
    print(f"{i}: {r} = {a} {op} {b}" if op != "uminus" else f"{i}: {r} = -{a}")
print("\nQuadruples:", *quads, sep="\n")` }
  ],
  beyond: [
    { skill: 'dsa', why: 'Tree traversals (post-order) generate code from expression trees.' },
    { skill: 'devops', why: 'Docker images and JVM bytecode are both “build once, run anywhere” formats like IR.' }
  ],
  cards: [
    ['Three-address code', 'Instructions with at most one operator on the right and at most three addresses.'],
    ['Quadruple', '(op, arg1, arg2, result)'],
    ['Triple', '(op, arg1, arg2); results referenced by instruction number.'],
    ['Indirect triples', 'A list of pointers to triples so instructions can be reordered.'],
    ['Two advantages of IR', 'Retargeting and machine-independent optimisation.']
  ],
  quiz: [
    { q: 'Which form lets the optimiser reorder instructions without renumbering references?', o: ['Triples', 'Quadruples or indirect triples', 'Postfix', 'Parse trees'], a: 1, why: 'Quadruples name results; indirect triples reorder pointers.' },
    { q: 'd := (a+b)+(a−c) needs how many temporaries in simple TAC?', o: ['1', '2', '3', '4'], a: 2, why: 't1 = a+b, t2 = a−c, t3 = t1+t2.' }
  ],
  tutorial: { no: 10, source: 'Tutorial-10-t31213.doc', items: [
    { n: 'D1', q: 'Advantages and disadvantages of generating intermediate code.', a: `<p><b>Advantages</b>: retargeting (reuse the front end for new machines); machine-independent optimisation; simpler to generate than machine code; portable distribution (bytecode). <b>Disadvantages</b>: an extra phase makes compilation slower and uses more memory; a generic IR may hide machine features, so final code can be less efficient without good back-end optimisation.</p>` },
    { n: 'D2', q: 'Write three-address code and the code sequence for: d := (a+b)+(a−c); p := (q−r)+(q+s)+(q+s); w := (x−y)+(y−x+z).', a: `<pre><code>d := (a+b)+(a-c)        p := (q-r)+(q+s)+(q+s)       w := (x-y)+(y-x+z)
t1 = a + b              t1 = q - r                   t1 = x - y
t2 = a - c              t2 = q + s                   t2 = y - x
t3 = t1 + t2            t3 = t1 + t2                 t3 = t2 + z
d  = t3                 t4 = q + s   (= t2, reusable) t4 = t1 + t3
                        t5 = t3 + t4                 w  = t4
                        p  = t5</code></pre><p>Code sequence for d (two-address machine): <code>MOV a,R0 · ADD b,R0 · MOV a,R1 · SUB c,R1 · ADD R1,R0 · MOV R0,d</code>.</p>` },
    { n: 'D3', q: 'Translate −(a + b) * (b + c + d) + (a + c) into three-address code.', a: `<pre><code>t1 = a + b
t2 = - t1          (unary minus)
t3 = b + c
t4 = t3 + d
t5 = t2 * t4
t6 = a + c
t7 = t5 + t6</code></pre>` },
    { n: 'D4', q: 'Show the code from Q3 as quadruples, triples and indirect triples.', a: `<p><b>Quadruples</b></p><table><tr><th>#</th><th>op</th><th>arg1</th><th>arg2</th><th>result</th></tr><tr><td>0</td><td>+</td><td>a</td><td>b</td><td>t1</td></tr><tr><td>1</td><td>uminus</td><td>t1</td><td></td><td>t2</td></tr><tr><td>2</td><td>+</td><td>b</td><td>c</td><td>t3</td></tr><tr><td>3</td><td>+</td><td>t3</td><td>d</td><td>t4</td></tr><tr><td>4</td><td>*</td><td>t2</td><td>t4</td><td>t5</td></tr><tr><td>5</td><td>+</td><td>a</td><td>c</td><td>t6</td></tr><tr><td>6</td><td>+</td><td>t5</td><td>t6</td><td>t7</td></tr></table><p><b>Triples</b></p><table><tr><th>#</th><th>op</th><th>arg1</th><th>arg2</th></tr><tr><td>(0)</td><td>+</td><td>a</td><td>b</td></tr><tr><td>(1)</td><td>uminus</td><td>(0)</td><td></td></tr><tr><td>(2)</td><td>+</td><td>b</td><td>c</td></tr><tr><td>(3)</td><td>+</td><td>(2)</td><td>d</td></tr><tr><td>(4)</td><td>*</td><td>(1)</td><td>(3)</td></tr><tr><td>(5)</td><td>+</td><td>a</td><td>c</td></tr><tr><td>(6)</td><td>+</td><td>(4)</td><td>(5)</td></tr></table><p><b>Indirect triples</b>: the same triples plus a statement list, e.g. <code>35 → (0), 36 → (1), 37 → (2), 38 → (3), 39 → (4), 40 → (5), 41 → (6)</code>. An optimiser reorders the statement list, not the triples.</p>` },
    { n: 'P1', kind: 'practical', q: 'Practical: build Java CUP and generate a parser from parser.cup; modify it to parse assignment statements; try do_debug_parse.', a: `<p>Add to parser.cup:</p><pre><code>terminal ID, ASSIGN, SEMI;
non terminal stmt;
stmt ::= ID:i ASSIGN expr:e SEMI   {: System.out.println(i + " = " + e); :} ;</code></pre><p>The scanner must return ID, ASSIGN and SEMI symbols (sym.java). With <code>do_debug_parse</code> the parser prints every shift and reduce it performs.</p>` }
  ] }
},
{
  id: 'plt11', subject: 'plt', num: 11, theme: 'back', title: 'Code optimisation', short: 'Optimisation',
  lecture: 'Tutorial-11 topic: Code Optimization',
  summary: 'Why optimise (and the costs), basic blocks and flow graphs, DAGs for finding common subexpressions, local vs global optimisation, and common techniques: constant folding, copy propagation, dead code elimination, loop-invariant code motion and strength reduction.',
  sections: [
    { h: 'Why optimise?', pics: [{ compare: { a: { title: 'Advantages', color: 'g', items: ['Faster programs', 'Smaller code', 'Less energy, memory'] }, b: { title: 'Disadvantages', color: 'r', items: ['Slower compile', 'Harder to debug', 'Optimiser bugs can change meaning'] } }, title: 'Optimisation trade-off' }], body: NOTE + `
      <p>An optimisation must <b>preserve the program's meaning</b>, should be worth its cost, and is usually done on the IR (machine-independent) and again on target code (machine-dependent).</p>` },
    { h: 'Basic blocks and DAGs', pics: [{ tree: { root: '+ (n5)', kids: [{ label: '− (n4)', kids: ['n1 = x + y', 'n3 = n1 * n2'] }, { label: 'n2 = x − y', kids: ['shared node'] }] }, color: 'c', title: 'DAG idea: shared nodes = common subexpressions' }], body: `
      <p>A <b>basic block</b> is straight-line code with one entry and one exit. A <b>DAG</b> for a block has a node per distinct value: leaves for variables and constants, interior nodes for operators. If the same operator and operands appear twice, the DAG <b>reuses the node</b>: that is a <b>common subexpression</b>, computed once.</p>` },
    { h: 'Local vs global optimisation', pics: [{ cards: [{ t: 'Constant folding', s: '2 * 3 → 6', c: 'p' }, { t: 'Common subexpression elimination', s: 'Reuse a + b', c: 'p' }, { t: 'Copy propagation', s: 'x = y; z = x → z = y', c: 't' }, { t: 'Dead code elimination', s: 'Remove unused results', c: 't' }, { t: 'Loop-invariant code motion', s: 'Move out of the loop', c: 'c' }, { t: 'Strength reduction', s: 'i * 4 → add 4 each time', c: 'c' }], cols: 2, title: 'Common optimisations' }], body: `
      <ul><li><b>Local</b>: within one basic block (DAG-based CSE, constant folding inside the block).</li><li><b>Global</b>: across blocks using the flow graph and data-flow analysis, e.g. moving <code>x = n * 2</code> out of a loop when n doesn't change in it, or removing an expression already computed in every path before.</li></ul>` }
  ],
  links: [
    { to: 'plt10', topic: 'Optimise TAC', text: 'Works on the three-address code from Topic 10.' },
    { to: 'plt12', topic: 'Then generate code', text: 'Optimised IR goes to the code generator (Topic 12).' },
    { to: 'ch5', topic: 'Reliability vs efficiency', text: 'Software QA Ch 5: more checks (reliability) can cost speed (efficiency); optimisers must never trade correctness for speed.' }
  ],
  mindmaps: [{ center: 'Optimisation', branches: [
    { label: 'Why', color: 'g', kids: ['Faster, smaller', 'Keep meaning'] },
    { label: 'Costs', color: 'r', kids: ['Slower compile', 'Harder debugging'] },
    { label: 'DAG', color: 'c', kids: ['Basic block', 'Shared nodes', 'Common subexpressions'] },
    { label: 'Local', color: 'p', kids: ['Within a block', 'Folding, CSE'] },
    { label: 'Global', color: 't', kids: ['Across blocks', 'Code motion', 'Strength reduction'] }
  ] }],
  cases: [
    { co: 'GCC / Clang', logo: '-O2', color: 'p', year: 'everyday', title: 'Optimisation levels', story: 'Compiling with -O0 keeps code easy to debug; -O2 or -O3 turns on many optimisations (inlining, loop and vector optimisations) for much faster programs.', lesson: 'The trade-off between debuggability and speed is a compiler switch.' },
    { co: 'V8 TurboFan', logo: 'V8', color: 't', year: '2017→', title: 'Optimising while running', story: 'V8 watches which JavaScript functions run often and optimises them with TurboFan, de-optimising if its assumptions about types turn out wrong.', lesson: 'Optimisations must stay correct even when assumptions break.' }
  ],
  code: [
    { title: 'Build a DAG and remove common subexpressions', lang: 'Python', explain: 'Value numbering: each (op, left, right) gets one node; repeats are reused. Shows the optimised TAC.', src: String.raw`def dag_tac(expr):
    nodes, code = {}, []
    def node(e):
        if isinstance(e, str):
            return e
        key = (e[0], node(e[1]), node(e[2]))
        if key not in nodes:                     # new value
            t = f"t{len(nodes) + 1}"
            nodes[key] = t
            code.append(f"{t} = {key[1]} {key[0]} {key[2]}")
        return nodes[key]                        # reused value
    node(expr)
    return code

# (x + y) - ((x + y) * (x - y)) + (x - y)
e = ("+", ("-", ("+", "x", "y"), ("*", ("+", "x", "y"), ("-", "x", "y"))), ("-", "x", "y"))
print(*dag_tac(e), sep="\n")
# t1 = x + y, t2 = x - y, t3 = t1 * t2, t4 = t1 - t3, t5 = t4 + t2  (5 instead of 7)` }
  ],
  beyond: [
    { skill: 'dsa', why: 'Memoisation in dynamic programming is the same idea as reusing DAG nodes.' },
    { skill: 'observability', why: 'Profile first: measure where time goes before optimising code yourself.' }
  ],
  cards: [
    ['Basic block', 'Straight-line code with one entry and one exit.'],
    ['What a DAG reveals', 'Common subexpressions: nodes with the same operator and operands are shared.'],
    ['Local vs global optimisation', 'Local: within one basic block. Global: across blocks using the flow graph.'],
    ['Loop-invariant code motion', 'Move computations that don’t change in the loop to before the loop.'],
    ['Strength reduction', 'Replace an expensive operation with a cheaper one (multiply by an add).']
  ],
  quiz: [
    { q: 'In (a+b)+(a−b)+(a−b), which node is shared in the DAG?', o: ['a+b', 'a−b', 'none', 'the final +'], a: 1, why: 'a−b appears twice.' },
    { q: 'Moving x = n*2 out of a loop where n never changes is…', o: ['Constant folding', 'Loop-invariant code motion', 'Dead code elimination', 'Copy propagation'], a: 1, why: 'The value is loop-invariant.' }
  ],
  tutorial: { no: 11, source: 'Tutorial-11-t31213.doc', items: [
    { n: 'D1', q: 'Advantages and disadvantages of optimising program code.', a: `<p><b>Advantages</b>: faster execution, smaller code, less memory and energy (important on phones and servers). <b>Disadvantages</b>: longer compile time, optimised code is harder to debug (variables optimised away, reordered lines), and optimiser bugs or aggressive assumptions can change program behaviour.</p>` },
    { n: 'D2', q: 'Construct the DAG for four expressions.', a: `<ul><li><b>a + b + a + b</b> = ((a+b)+a)+b: n1 = a+b; n2 = n1+a; n3 = n2+b. Only leaves a, b are shared; no repeated subexpression (unless we reassociate to 2·(a+b)).</li><li><b>(a+b)+(a−b)+(a−b)</b>: n1 = a+b; n2 = a−b; n3 = n1+n2; n4 = n3+n2. <b>n2 is shared</b>.</li><li><b>(x+y)−((x+y)*(x−y))+(x−y)</b>: n1 = x+y; n2 = x−y; n3 = n1*n2; n4 = n1−n3; n5 = n4+n2. <b>n1 and n2 shared</b>.</li><li><b>p − p*(q+r) + (q+r)*t</b>: n1 = q+r; n2 = p*n1; n3 = p−n2; n4 = n1*t; n5 = n3+n4. <b>n1 shared</b>, leaf p used twice.</li></ul>` },
    { n: 'D3', q: 'Explain how the DAG helps optimisation using one example.', a: `<p>For (x+y)−((x+y)*(x−y))+(x−y), naive TAC computes x+y and x−y twice (7 instructions). The DAG shares those nodes, so generating code from it gives:</p><pre><code>t1 = x + y
t2 = x - y
t3 = t1 * t2
t4 = t1 - t3
t5 = t4 + t2</code></pre><p>Five instructions: common subexpressions computed once. DAGs also show which values are dead (no parents and not assigned to a live variable).</p>` },
    { n: 'D4', q: 'Differences between local and global optimisation, with examples.', a: `<p><b>Local</b>: inside one basic block, no knowledge of other blocks. E.g. in <code>t1 = 4*i; t2 = 4*i</code> → reuse t1; <code>x = 2*3</code> → <code>x = 6</code>.</p><p><b>Global</b>: across basic blocks using control-flow and data-flow analysis. E.g. moving <code>limit = n*2</code> out of a <code>while (i &lt; limit)</code> loop; eliminating <code>a+b</code> in a block when it was already computed on every path leading to it; removing code after an unconditional return.</p>` },
    { n: 'P1', kind: 'practical', q: 'Practical: integrate the JLex scanner with the Java CUP parser.', a: `<p>Generate <code>e1.lex.java</code> with JLex into the parser project, make the scanner return <code>java_cup.runtime.Symbol</code> objects using the constants in <code>sym.java</code>, and construct the parser with it: <code>parser p = new parser(new Yylex(fin)); p.parse();</code>.</p>` }
  ] }
},
{
  id: 'plt12', subject: 'plt', num: 12, theme: 'back', title: 'Code generation', short: 'Code generation',
  lecture: 'Tutorial-12 topic: Code Generation',
  summary: 'Issues in designing a code generator (input IR, target program, memory management, instruction selection, register allocation, evaluation order), a simple target machine with addressing modes, instruction costs, and generating code with Java CUP actions.',
  sections: [
    { h: 'Design issues', pics: [{ cards: [{ t: 'Input', s: 'TAC, trees, bytecode?', c: 'p' }, { t: 'Target program', s: 'Absolute, relocatable, assembly', c: 'p' }, { t: 'Memory management', s: 'Names → addresses', c: 't' }, { t: 'Instruction selection', s: 'Which instructions', c: 't' }, { t: 'Register allocation', s: 'What lives in registers', c: 'c' }, { t: 'Evaluation order', s: 'Fewer registers needed', c: 'c' }], cols: 2, title: 'Code generator issues' }], body: NOTE + `
      <ul><li><b>Input</b>: the IR form decides how much work remains (TAC vs tree vs stack code).</li><li><b>Output</b>: absolute machine code (load and run), relocatable (link separately) or assembly (easier, needs an assembler).</li><li><b>Memory management</b>: map names to addresses (static, stack frames, heap).</li><li><b>Instruction selection</b>: rich instruction sets offer many choices; pick cheap, correct ones.</li><li><b>Register allocation</b>: registers are fastest but few; deciding which values stay in them matters most for speed.</li></ul>` },
    { h: 'Target machine and costs', pics: [{ cards: [{ t: 'Register  R0', s: 'cost +0', c: 'g' }, { t: 'Memory / absolute  M', s: 'cost +1', c: 'a' }, { t: 'Indexed  c(R)', s: 'cost +1', c: 'a' }, { t: 'Indirect  *R', s: 'cost +0', c: 't' }, { t: 'Literal  #c', s: 'cost +1', c: 'a' }], cols: 2, title: 'Addressing modes (Dragon book style)' }], body: `
      <p>Instruction cost = 1 + 1 for each operand that is a memory address or literal (it takes an extra word). Registers are free. So keep values in registers and reuse them.</p>` },
    { h: 'Simple code generator', body: `
      <p>For each TAC instruction <code>x = y op z</code>: find where y is (register or memory), load it into a register if needed, apply <code>op</code> with z, and record that the register now holds x. Store x to memory only when needed (end of block, or the register is reused). Register and address descriptors track what is where.</p>` }
  ],
  links: [
    { to: 'plt11', topic: 'Optimised IR', text: 'The code generator receives optimised IR from Topic 11.' },
    { to: 'plt1', topic: 'Back end', text: 'Last phase of the pipeline in Topic 1.' }
  ],
  mindmaps: [{ center: 'Code generation', branches: [
    { label: 'Inputs', color: 'p', kids: ['TAC, trees', 'Symbol table info'] },
    { label: 'Outputs', color: 'p', kids: ['Absolute', 'Relocatable', 'Assembly'] },
    { label: 'Key issues', color: 't', kids: ['Memory management', 'Instruction selection', 'Register allocation', 'Evaluation order'] },
    { label: 'Costs', color: 'c', kids: ['1 + memory operands', 'Registers free'] },
    { label: 'Generator', color: 'a', kids: ['Register descriptors', 'Address descriptors'] }
  ] }],
  cases: [
    { co: 'Apple Rosetta 2', logo: 'R2', color: 't', year: '2020', title: 'Translating x86 to ARM', story: 'When Macs moved to Apple silicon, Rosetta 2 translated x86-64 programs into ARM machine code so old apps kept working.', lesson: 'Code generation for a different target machine, done as binary translation.' },
    { co: 'Register allocation', logo: 'RA', color: 'p', year: 'classic', title: 'Graph colouring', story: 'Many compilers model which values are alive at the same time as a graph and assign registers by colouring it so connected values get different registers (Chaitin, 1980s).', lesson: 'A hard problem solved with a graph algorithm.' }
  ],
  code: [
    { title: 'Generate code for a := (b + c) * (d + e) and count the cost', lang: 'Python', explain: 'Two code sets (registers vs memory temporaries) with the cost rule 1 + number of memory operands.', src: String.raw`def cost(instr):
    ops = instr.split(None, 1)[1].split(",")
    return 1 + sum(not op.strip().startswith("R") for op in ops)

register_code = ["MOV b,R0", "ADD c,R0", "MOV d,R1", "ADD e,R1", "MUL R1,R0", "MOV R0,a"]
memory_code   = ["MOV b,t1", "ADD c,t1", "MOV d,t2", "ADD e,t2", "MUL t2,t1", "MOV t1,a"]

for name, code in [("registers", register_code), ("memory", memory_code)]:
    total = sum(cost(i) for i in code)
    print(f"{name:10} total cost {total}:", ", ".join(f"{i}({cost(i)})" for i in code))
# registers: 11, memory: 18` }
  ],
  beyond: [
    { skill: 'dsa', why: 'Register allocation is graph colouring; instruction selection is tree pattern matching.' },
    { skill: 'devops', why: 'Building for different CPUs (x86, ARM) in CI uses different code generators of the same compiler.' }
  ],
  cards: [
    ['Six code-generator design issues', 'Input IR, target program form, memory management, instruction selection, register allocation, evaluation order.'],
    ['Why register allocation matters', 'Registers are fastest but few; good allocation avoids slow memory accesses.'],
    ['Instruction cost rule', '1 + 1 for each memory or literal operand.'],
    ['Relocatable vs absolute code', 'Relocatable can be linked and placed anywhere; absolute has fixed addresses.']
  ],
  quiz: [
    { q: 'Cost of MOV b,R0 under the 1 + memory-operands rule is…', o: ['1', '2', '3', '0'], a: 1, why: '1 for the instruction + 1 for memory operand b.' },
    { q: 'Which choice gives the biggest speed win in most generated code?', o: ['Comment removal', 'Good register allocation', 'Longer names', 'Relocatable output'], a: 1, why: 'Memory access is much slower than registers.' }
  ],
  tutorial: { no: 12, source: 'Tutorial-12-t31213.doc', items: [
    { n: 'D1', q: 'How do different inputs and outputs affect the design of the code generator?', a: `<p><b>Input</b>: high-level IR (syntax trees) needs more work (instruction selection by tree matching); low-level TAC maps more directly; stack-based bytecode suits stack machines. Input is assumed type-checked and error-free. <b>Output</b>: absolute code is fast to load but inflexible; relocatable code supports separate compilation and linking; assembly is easiest to generate and read but needs an assembler. The target's instruction set (RISC vs CISC), number of registers and addressing modes shape every decision.</p>` },
    { n: 'D2', q: 'Why are memory management, instruction selection and register allocation important?', a: `<ul><li><b>Memory management</b>: every name must get a correct address (static data, stack frame offsets for locals and parameters, heap), or the program is wrong.</li><li><b>Instruction selection</b>: the same TAC can map to many instruction sequences with very different costs (e.g. <code>INC a</code> vs <code>MOV a,R0; ADD #1,R0; MOV R0,a</code>).</li><li><b>Register allocation</b>: registers are far faster than memory and few in number; choosing which values live in registers has the largest effect on speed.</li></ul>` },
    { n: 'D3', q: 'Given a := (b + c) * (d + e), write two code sets using different addressing modes.', a: `<p>TAC: <code>t1 = b + c; t2 = d + e; t3 = t1 * t2; a = t3</code>.</p><pre><code>Set 1: registers                  Set 2: memory temporaries
MOV b, R0                         MOV b, t1
ADD c, R0                         ADD c, t1
MOV d, R1                         MOV d, t2
ADD e, R1                         ADD e, t2
MUL R1, R0                        MUL t2, t1
MOV R0, a                         MOV t1, a</code></pre><p>(Another variant uses indirect mode: if R2 points to b, <code>MOV *R2, R0</code> costs 1.)</p>` },
    { n: 'D4', q: 'Calculate the instruction costs for the code sets in Q3.', a: `<p>Cost = 1 + 1 per memory operand.</p><table><tr><th>Set 1</th><th>Cost</th><th>Set 2</th><th>Cost</th></tr><tr><td>MOV b,R0</td><td>2</td><td>MOV b,t1</td><td>3</td></tr><tr><td>ADD c,R0</td><td>2</td><td>ADD c,t1</td><td>3</td></tr><tr><td>MOV d,R1</td><td>2</td><td>MOV d,t2</td><td>3</td></tr><tr><td>ADD e,R1</td><td>2</td><td>ADD e,t2</td><td>3</td></tr><tr><td>MUL R1,R0</td><td>1</td><td>MUL t2,t1</td><td>3</td></tr><tr><td>MOV R0,a</td><td>2</td><td>MOV t1,a</td><td>3</td></tr><tr><td><b>Total</b></td><td><b>11</b></td><td><b>Total</b></td><td><b>18</b></td></tr></table><p>Keeping intermediate results in registers is much cheaper.</p>` },
    { n: 'P1', kind: 'practical', q: 'Practical: add action code to parser.cup to generate code for expressions and statements.', a: `<pre><code>expr ::= expr:e1 PLUS expr:e2
         {: String t = newTemp(); System.out.println(t + " = " + e1 + " + " + e2); RESULT = t; :}
       | expr:e1 TIMES expr:e2
         {: String t = newTemp(); System.out.println(t + " = " + e1 + " * " + e2); RESULT = t; :}
       | ID:i  {: RESULT = i; :} ;
stmt ::= ID:i ASSIGN expr:e SEMI  {: System.out.println(i + " = " + e); :} ;</code></pre><p><code>newTemp()</code> returns t1, t2, … so the parser prints three-address code as it reduces.</p>` }
  ] }
}
];
export default chapters;
