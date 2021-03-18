
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
        <div id="webgl1">
            Tab 1
            <canvas id="canvas1"></canvas>
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

    // resize renderer
    const elDimensions = el.getBoundingClientRect();
    const w = elDimensions.width;
    const h = elDimensions.height;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.userData.elementID = elID;
    renderer.setSize(w, h);

    // add renderer element
    el.appendChild(renderer.domElement);

    // override bootstrap listeners
    const dt = $('a[data-toggle="tab"]');
    dt.on('shown.bs.tab', function(e) {
        const target = $(e.target).attr('href');
        if (target === '#tab1')
        {
            console.log('poupi');
            document.getElementById('tab1').style.display = 'block';
        }
    });
    dt.on('hide.bs.tab', function(e) {
        const target = $(e.target).attr('href');
        if (target === '#tab1')
        {
            console.log('poupi');
            document.getElementById('tab1').style.display = 'none';
        }
    });
}

export { initHTML };
