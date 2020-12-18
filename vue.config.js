module.exports = {
    css: {
        loaderOptions: {
            scss: {
                sassOptions: {
                    prependData: `
                  @import "@/scss/variables.scss";
                  @import "@/scss/mixins.scss";
                  @import "@/scss/functions.scss";
                `
                }
            }
        }
    }
}