
import $ from 'jquery';

const tabs = `
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
            Application
        </a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="model-tab" data-toggle="tab" href="#tab4" role="tab">
            Model View
        </a>
    </li>
</ul>

<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="tab1" role="tabpanel">
        Architecture
        <div id="rete">
        </div>
    </div>
    <div class="tab-pane fade" id="tab2" role="tabpanel">
        Training
    </div>
    <div class="tab-pane fade" id="tab3" role="tabpanel">
        Application
    </div>
    <div class="tab-pane fade" id="tab4" role="tabpanel">
        Model View
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
    dt.on('shown.bs.tab', function(e) {
        const target = $(e.target).attr('href');
        if (target === '#tab4')
        {
            document.getElementById('tab4').style.display = 'block';

            // resize
            const el2 = document.getElementById('myTabContent');
            resize(el2, camera, renderer);
        }
    });
    dt.on('hide.bs.tab', function(e) {
        const target = $(e.target).attr('href');
        if (target === '#tab4')
        {
            document.getElementById('tab4').style.display = 'none';
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
