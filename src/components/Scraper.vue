<template>
  <div>
      <FormulateForm
        v-model="formValues"
        @submit="onSubmit" 
        >
        <FormulateInput
            name="url"
            label="What is the url of the site you want to scrap?"
        />
        <FormulateInput
            name="path"
            label="Which data did you want to grab?"
        />
        <FormulateInput
            type="submit"
            label="Get Data"
        />
    </FormulateForm>
    <div>
        {{data.length > 0 ? data : null}}
    </div>
  </div>
</template>

<script>
import rp from 'request-promise'
import $ from 'cheerio'
import * as fb from '../firebase'

export default {
    data() {
        return {
            data: [],
            formValues: {}
        }
    },
    methods: {
        onSubmit() {
            let that = this;
            rp("https://cors-anywhere.herokuapp.com/" + this.formValues.url)
                .then(function(html) {
                    console.log($('#mw-content-text > div.mw-parser-output > table:nth-child(12) > tbody > tr > td:nth-child(3) > span > span > span > a', html).length)
                    //success!
                    const players = [];
                    for (let i = 0; i < 58; i++) {
                        let name = $('#mw-content-text > div.mw-parser-output > table:nth-child(12) > tbody > tr > td:nth-child(3) > span > span > span > a', html)[i].attribs.title;
                        let url = $('#mw-content-text > div.mw-parser-output > table:nth-child(12) > tbody > tr > td:nth-child(3) > span > span > span > a', html)[i].attribs.href;
                        players.push({
                            name,
                            url
                        })
                    }
                    that.data = players
                    return players
                })
                .then(players => {
                    // console.log(players)
                    players.map(async player => {
                        // console.log(player.name)
                        await fb.playersCollection.add({
                            name: player.name,
                            url: player.url
                        })
                    })
                })
                .catch(function(err) {
                    //handle error
                    console.error(err);
                });
        }
    }

}
</script>

<style>

</style>