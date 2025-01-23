type showDiary = 'true' | 'false';

class ShowDiary {
    private localStorageKey = 'showDiary';
    private currentScheme: showDiary;

    constructor(toggleEl: HTMLElement) {
        this.currentScheme = this.getSavedScheme();

        this.dispatchEvent(document.documentElement.dataset.diary as showDiary);

        if (toggleEl)
            this.bindClick(toggleEl);

        // todo
        // if (document.body.style.transition == '')
        //     document.body.style.setProperty('transition', 'background-color .3s ease');
    }

    private saveScheme() {
        localStorage.setItem(this.localStorageKey, this.currentScheme);
    }

    private bindClick(toggleEl: HTMLElement) {
        toggleEl.addEventListener('click', (e) => {
            // console.log("click");
            this.currentScheme = this.isDiaryVisible() ? 'false' : 'true';
            this.setBodyClass();
            this.saveScheme();
        })
    }

    private isDiaryVisible() {
        return this.currentScheme == 'true';
    }

    private dispatchEvent(showDiary: showDiary) {
        const event = new CustomEvent('onshowDiaryChange', {
            detail: showDiary
        });
        window.dispatchEvent(event);
    }

    private setBodyClass() {
        if (this.isDiaryVisible()) {
            document.documentElement.dataset.diary = 'false';
        }
        else {
            document.documentElement.dataset.diary = 'true';
        }

        this.dispatchEvent(document.documentElement.dataset.diary as showDiary);
    }

    private getSavedScheme(): showDiary {
        const savedScheme = localStorage.getItem(this.localStorageKey);

        if (savedScheme == 'true' || savedScheme == 'false') return savedScheme;
        else return 'true';
    }
}

export default ShowDiary;
