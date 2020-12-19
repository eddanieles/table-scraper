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
                name="tblData"
                type="group"
                :repeatable="true"
                label="Which table data to grab?"
                add-label="+ Add"
                validation="required"
            >
                <FormulateInput
                    name="name"
                    label="Name:"
                />
                <FormulateInput
                    name="path"
                    label="Path:"
                />
                <FormulateInput
                    name="attrib"
                    label="Attribute:"
                />
            </FormulateInput>
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
// import * as fb from '../firebase'
// import _ from 'lodash'

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
                    //success!
                    const players = [];
                    that.formValues.tblData.map(column => {
                        let dataLength = $(column.path, html).length;
                        for (let i = 0; i < dataLength; i++) {
                            //sample data: let url = $('#mw-content-text > div.mw-parser-output > table:nth-child(12) > tbody > tr > td:nth-child(3) > span > span > span > a', html)[i].attribs.href;
                            if (!players[i]) {
                                players[i] = {}
                                players[i][column.name] = $(column.path, html)[i].attribs[column.attrib]
                            } else {
                                players[i][column.name] = $(column.path, html)[i].attribs[column.attrib]
                            }
                            
                        }
                    })
                    
                    that.data = players;
                    return players;
                })
                // .then(players => {
                //     players.map(player => {

                //         fb.playersCollection.get()
                //             .then(querySnapshot => {
                //                 querySnapshot.forEach(async doc => {
                //                     if (!_.find(players, doc.data()) && player != doc.data()) {
                //                         // console.log(`player: ${JSON.stringify(player)} firebase doc: ${JSON.stringify(doc.data())}`)
                //                         await fb.playersCollection.add({
                //                             name: player.name,
                //                             url: player.url
                //                         })
                //                     }
                //                 })
                //             })
                //     })                    
                // })
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