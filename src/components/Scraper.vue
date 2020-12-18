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
import _ from 'lodash'

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
                    let dataLength = $('#mw-content-text > div.mw-parser-output > table:nth-child(12) > tbody > tr > td:nth-child(3) > span > span > span > a', html).length
                    //success!
                    const players = [];
                    for (let i = 0; i < dataLength; i++) {
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
                    players.map(player => {

                        fb.playersCollection.get()
                            .then(querySnapshot => {
                                querySnapshot.forEach(async doc => {
                                    if (!_.find(players, doc.data()) && player != doc.data()) {
                                        console.log(`player: ${JSON.stringify(player)} firebase doc: ${JSON.stringify(doc.data())}`)
                                        await fb.playersCollection.add({
                                            name: player.name,
                                            url: player.url
                                        })
                                    }
                                })
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