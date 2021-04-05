
import $ from 'jquery';

const tabs = `
<!-- Navbar text -->
<ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" id="arch-tab" data-toggle="tab" href="#tab1" role="tab"
        aria-controls="home" aria-selected="true">
            Architecture
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="train-tab" data-toggle="tab" href="#tab2" role="tab">
            Training
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="app-tab" data-toggle="tab" href="#tab3" role="tab">
            Simulation
        </a>
    </li>
</ul>

<!-- Actual tab content -->
<div class="tab-content" id="myTabContent">
    <!-- Arch tab -->
    <div class="tab-pane fade show active" id="tab1" role="tabpanel">
        <!-- Architecture -->
        <div class="container-fluid d-flex h-100 flex-column" style="padding: 0">
            <div class="row">
                <div id="architecture-header" class="col-12">
                Classification / regression
                </div>
            </div>
            <div class="row col-12 d-flex flex-fill">
                <div id="rete" class="col-8">
                </div>
                <div id="panel-code" class="col-4">
                    <p id="panel-code-title">Python code</p>
                    <div id="code-container" class="flex-fill">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Visor / training tab -->
    <div class="tab-pane fade" id="tab2" role="tabpanel">
        Work in progress…
    </div>

    <!-- 3js simulator view -->
    <div class="tab-pane fade" id="tab3" role="tabpanel">
        Simulation
        <div id="webgl1">
        </div>
    </div>
</div>
`;

function initHTML(renderer, camera)
{
    // make main div
    const tabDiv = document.createElement('div');
    tabDiv.setAttribute('id', 'main');
    document.body.appendChild(tabDiv);

    // add tabs
    tabDiv.innerHTML = tabs;

    // make renderer element
    const elID = 'webgl1';
    const el = document.getElementById(elID);
    renderer.userData.elementID = 'myTabContent';

    // resize renderer
    resize(el, camera, renderer);

    // add renderer element
    el.appendChild(renderer.domElement);

    // override bootstrap listeners
    const dt = $('a[data-toggle="tab"]');
    const threeTabID = 'tab3';
    dt.on('shown.bs.tab', function(e) {
        const target = $(e.target).attr('href');
        if (target === `#${threeTabID}`)
        {
            document.getElementById(threeTabID).style.display = 'block';

            // resize
            const el2 = document.getElementById('myTabContent');
            resize(el2, camera, renderer);
        }
    });
    dt.on('hide.bs.tab', function(e) {
        const target = $(e.target).attr('href');
        if (target === `#${threeTabID}`)
        {
            document.getElementById(threeTabID).style.display = 'none';
        }
    });
}

function resize(el, camera, renderer)
{
    if (!el) return;
    const elDimensions = el.getBoundingClientRect();
    const w = Math.floor(elDimensions.width);
    const h = Math.floor(elDimensions.height);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
}

export { initHTML };
