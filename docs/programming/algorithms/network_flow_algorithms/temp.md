# Shortest Path Algorithms

<math>
    <mtext>There are no capacities 
        <mstyle style="font-weight: bold; color: grey;">
            (uncapacitated problem)
        </mstyle>
        :
    </mtext>
    <mstyle style="color: orange;">
        <mtext>as much flow on an arc as we want can be send</mtext>
    </mstyle>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>Directed graph:</mtext>
    <mstyle style="color: orange;">
        <mi>G</mi>
        <mo>=</mo>
        <mo>(</mo>
        <mi>V</mi>
        <mo>,</mo>
        <mi>A</mi>
        <mo>)</mo>
    </mstyle>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>Number of vertices in the graph:</mtext>
    <mstyle style="color: orange;">
        <mi>n</mi>
    </mstyle>
    <mtext>(</mtext>
    <mstyle style="color: orange;">
        <mi>n</mi>
        <mo>=</mo>
        <mo>|</mo>
        <mi>V</mi>
        <mo>|</mo>
    </mstyle>
    <mtext>)</mtext>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>Number of arcs in the graph:</mtext>
    <mstyle style="color: orange;">
        <mi>n</mi>
    </mstyle>
    <mtext>(</mtext>
    <mstyle style="color: orange;">
        <mi>m</mi>
        <mo>=</mo>
        <mo>|</mo>
        <mi>A</mi>
        <mo>|</mo>
    </mstyle>
    <mtext>)</mtext>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>Distinguished vertex(source):</mtext>
    <mstyle style="color: orange;">
        <mo>s</mo>
    </mstyle>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>For each arc</mtext>
    <mstyle style="color: orange;">
        <mo>(</mo>
        <mi>i</mi>
        <mo>,</mo>
        <mi>j</mi>
        <mo>)</mo>
        <mo>&isin;</mo>
        <mi>A</mi>
    </mstyle>
    <mtext>coast is given</mtext>
    <mstyle style="color: orange;">
        <mi>c</mi>
        <mo>(</mo>
        <mi>i</mi>
        <mo>,</mo>
        <mi>j</mi>
        <mo>)</mo>
    </mstyle>
    <mtext>of traveling from</mtext>
    <mstyle style="color: orange;">
        <mi>i</mi>
    </mstyle>
    <mtext>to</mtext>
    <mstyle style="color: orange;">
        <mi>j</mi>
    </mstyle>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>A non-empty path from</mtext>
    <mstyle style="color: orange;">
        s
    </mstyle>
    <mtext>to</mtext>
    <mstyle style="color: orange;">
        i
    </mstyle>
    <mtext>is a sequence of arcs:</mtext>
    <mstyle style="color: orange;">
        <mo>(</mo>
        <mi>s</mi>
        <mo>,</mo>
        <msub>
            <mi>j</mi>
            <mn>1</mn>
        </msub>
        <mo>)</mo>
        <mtext>,</mtext>
        <mo>(</mo>
        <msub>
            <mi>j</mi>
            <mn>1</mn>
        </msub>
        <mo>,</mo>
        <msub>
            <mi>j</mi>
            <mn>2</mn>
        </msub>
        <mo>)</mo>
        <mtext>,</mtext>
        <mo>(</mo>
        <msub>
            <mi>j</mi>
            <mn>2</mn>
        </msub>
        <mo>,</mo>
        <msub>
            <mi>j</mi>
            <mn>3</mn>
        </msub>
        <mo>)</mo>
        <mtext>,....,</mtext>
        <mo>(</mo>
        <msub>
            <mi>j</mi>
            <mn>k</mn>
        </msub>
        <mo>,</mo>
        <mi>i</mi>
        <mo>)</mo>
    </mstyle>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>If no vertex is repeated in the path:</mtext>
    <mstyle style="color: orange;">
        <mtext>simple path</mtext>
    </mstyle>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>A path that starts and ends at the same vertex:</mtext>
    <mstyle style="color: orange;">
        <mtext>cycle</mtext>
    </mstyle>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>Cycle in which only the start and end vertices are repeated:</mtext>
    <mstyle style="color: orange;">
        <mtext>simple cycle</mtext>
    </mstyle>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>Cost of traveling from </mtext>
    <mstyle style="color: orange;">
        <mi>s</mi>
    </mstyle>
    <mtext>to</mtext>
    <mstyle style="color: orange;">
        <mi>i</mi>
    </mstyle>
    <mtext>with minimal coast:</mtext>
    <mstyle style="color: orange;">
        <mi>d</mi>
        <mo>(</mo>
        <mi>i</mi>
        <mo>)</mo>
    </mstyle>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>If there is no path from:</mtext>
    <mstyle style="color: orange;">
        <mi>s</mi>
    </mstyle>
    <mtext>to</mtext>
    <mstyle style="color: orange;">
        <mi>i</mi>
    </mstyle>
    <mtext>in</mtext>
    <mstyle style="color: orange;">
        <mi>G</mi>
    </mstyle>
    <mtext>with minimal coast:</mtext>
    <mstyle style="color: orange;">
        <mi>d</mi>
        <mo>(</mo>
        <mi>i</mi>
        <mo>)</mo>
        <mo>=</mo>
        <mi>∞</mi>
    </mstyle>
    <mtext>;</mtext>
</math>

<br/>

<math>
    <mtext>Cheapest path from</mtext>
    <mstyle style="color: orange;">
        <mi>s</mi>
    </mstyle>
    <mtext>to</mtext>
    <mstyle style="color: orange;">
        <mi>i</mi>
    </mstyle>
    <mtext>
        <mstyle style="font-weight: bold; color: grey;">
            (and the cost of shipping on this path)
        </mstyle>
    </mtext>
    <mstyle style="color: orange;">
        <mi>a</mi>
        <mo>(</mo>
        <mi>i</mi>
        <mo>)</mo>
        <mi>d</mi>
        <mo>(</mo>
        <mi>i</mi>
        <mo>)</mo>
    </mstyle>
    <mtext>;</mtext>
</math>