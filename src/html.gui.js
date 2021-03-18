
import $ from 'jquery';

const tabs = `
<ul class="nav nav-tabs" id="myTab" role="tablist">
    <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#tab1" role="tab" aria-controls="home" aria-selected="true">Home</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#tab2" role="tab" aria-controls="profile" aria-selected="false">Profile</a>
    </li>
    <li class="nav-item">
        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#tab3" role="tab" aria-controls="contact" aria-selected="false">Contact</a>
    </li>
</ul>
<div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="tab1" role="tabpanel" aria-labelledby="home-tab">
        Tab 1
        <div id="webgl1">
        </div>
    </div>
    <div class="tab-pane fade" id="tab2" role="tabpanel" aria-labelledby="profile-tab">
        Tab 2
    </div>
    <div class="tab-pane fade" id="tab3" role="tabpanel" aria-labelledby="contact-tab">
        Tab 3
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
        if (target === '#tab1')
        {
            document.getElementById('tab1').style.display = 'block';

            // resize
            const el2 = document.getElementById('myTabContent');
            resize(el2, camera, renderer);
        }
    });
    dt.on('hide.bs.tab', function(e) {
        const target = $(e.target).attr('href');
        if (target === '#tab1')
        {
            document.getElementById('tab1').style.display = 'none';
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
