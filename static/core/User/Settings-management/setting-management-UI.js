document.getElementById('setting-icon').addEventListener('click', event => {
    Swal.fire({
        title: '<strong>الإعدادات</strong>',
        html: `<div class="tabs">

    <input type="radio" id="tab1" name="tab-control" checked>
<input type="radio" id="tab2" name="tab-control">
    <input type="radio" id="tab3" name="tab-control">
    <input type="radio" id="tab4" name="tab-control">
    <ul>
    <li><label for="tab1" role="button">
    <svg  viewBox="0 0 24 24">
    <path fill="#444" d="M10,2H14L13.21,9.91L19.66,5.27L21.66,8.73L14.42,12L21.66,15.27L19.66,18.73L13.21,14.09L14,22H10L10.79,14.09L4.34,18.73L2.34,15.27L9.58,12L2.34,8.73L4.34,5.27L10.79,9.91L10,2Z" />
</svg>
    <span>عام</span>
    </label>
    </li>
<li ><label for="tab2" role="button"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
    <path fill="#444" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
</svg><span>تحرير</span></label></li>
<li ><label for="tab3" role="button">
<svg viewBox="0 0 24 24">
    <path fill="#444" d="M5.81,2C4.83,2.09 4,3 4,4V20C4,21.05 4.95,22 6,22H18C19.05,22 20,21.05 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6C5.94,2 5.87,2 5.81,2M12,13H13A1,1 0 0,1 14,14V18H13V16H12V18H11V14A1,1 0 0,1 12,13M12,14V15H13V14H12M15,15H18V16L16,19H18V20H15V19L17,16H15V15Z" />
</svg>

    <span>القاموس</span></label></li>
</ul>

<div class="slider"><div class="indicator"></div></div>
<div class="content">
    <section id="general-settings">
    <h2>عام</h2>
    <div class="option">
                    <input class="inp-cbx"  type="checkbox" id="force-arabic-number" style="display: none;"/>
            <label class="check-box" for="force-arabic-number"><span>
    <svg width="12px" height="10px" viewbox="0 0 12 10">
      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
    </svg></span><span>أرقام عربية هندية فقط</span></label>
</div>
    <div class="option">
                    <input class="inp-cbx"  type="checkbox" id="enable-auto-save" style="display: none;"/>
            <label class="check-box" for="enable-auto-save"><span>
    <svg width="12px" height="10px" viewbox="0 0 12 10">
      <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
    </svg></span><span>حفظ تلقائي</span></label>
</div>

    </section>
<section>
<h2>تحرير</h2>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem quas adipisci a accusantium eius ut voluptatibus ad impedit nulla, ipsa qui. Quasi temporibus eos commodi aliquid impedit amet, similique nulla.</section>
<section>
<h2>القاموس</h2>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam nemo ducimus eius, magnam error quisquam sunt voluptate labore, excepturi numquam! Alias libero optio sed harum debitis! Veniam, quia in eum.</section>
<section>
</div>
</div>`,
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false
    });

    console.log(123);
});