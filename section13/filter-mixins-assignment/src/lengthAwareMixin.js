
export const lengthAwareMixin =  {
    computed: {
        lengthAware1() {
            return this.secondText + ' ( ' + this.secondText.length + ' )';
        }
    }
} ;