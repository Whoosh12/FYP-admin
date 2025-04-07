export class moreInfo extends HTMLElement {
    constructor() {
        super();
        this.p1 = null;
        this.p2 = null;
        this.span = null;
        this.button = null;
    }

    connectedCallBack() {
        const shadow = this.attachShadow({ mode: 'open' });

        this.span = document.createElement('span');

        this.p1 = document.createElement('p');

        this.button = document.createElement('button');

        this.button.addEventListener('click', this.showP2);
        // this.span.append(this.p1, this.button);
        shadow.append(this.p1);
        

    }

    showP2(){
        this.p2 = document.createElement('p');
    }
}

customElements.define('moreInfo', moreInfo);