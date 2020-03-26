(this["webpackJsonpcorona-frontend"]=this["webpackJsonpcorona-frontend"]||[]).push([[0],{124:function(e,t,a){e.exports=a(202)},202:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(6),s=a.n(i),o=a(13),l=a(14),c=a(16),m=a(17),d=a(215),h=a(21),u=a(82),p=a.n(u),b=a(22),E=a.n(b),g=a(214),f=a(213),v=a(207),N=a(208),y=a(209),_=a(210),C=a(211),O=a(212),w=g.a.Option,I=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).districtChange=function(e){n.setState({district:e},(function(){n.refreshReqs()}))},n.refreshReqs=function(){var e="";n.state.district&&(e="?district="+n.state.district),e?e+="&state="+n.props.match.params.state:e="?state="+n.props.match.params.state,fetch("http://covidapi.letsendorse.com/requirements"+e,{method:"GET"}).then((function(e){return e.json()})).then((function(e){n.setState({requirements:e.requirements})})).catch((function(e){console.log(e)}))},n.express=function(e){var t={districts:[e.district],materials:[e.material],amount:"",contribute_as:"",contributer_info:{name:"",phone:"",email:""},message:"",preffered_supplier:""};n.setState({newContribution:t,selectedRequirement:e,showInterestModal:!0})},n.closeInterestModal=function(){n.setState({selectedRequirement:null,showInterestModal:!1})},n.onChangeHandler=function(e,t){t.target&&(t=t.target.value);var a=n.state.newContribution;"districts"===e||"materials"===e||"amount"===e||"contribute_as"===e||"message"===e||"preffered_supplier"===e?a[e]=t:"contributer_info_name"!==e&&"contributer_info_phone"!==e&&"contributer_info_email"!==e&&"contributer_info_organization"!==e&&"contributer_info_designation"!==e||(a.contributer_info[e.split("_")[2]]=t),n.setState({newContribution:a})},n.closeSharingModal=function(){n.setState({showSharingModal:!1})},n.contribute=function(){var e=!1,t=n.state.newContribution,a={};t.districts.length&&t.materials.length&&t.amount&&t.contribute_as&&t.contributer_info.name&&t.contributer_info.phone&&t.contributer_info.email&&("organization"!==t.contribute_as||t.contributer_info.organization&&t.contributer_info.designation)||(e=!0),e?(t.districts.length||(a.districts="Please select at least one District"),t.materials.length||(a.materials="Please select at least one Material"),t.amount||(a.amount="Please enter contribution amount"),t.contribute_as||(a.contribute_as="Please select at least one option"),t.contributer_info.name||(a.name="Please enter your Full Name"),t.contributer_info.phone||(a.phone="Please enter your Phone Number"),t.contributer_info.email||(a.email="Please enter your Email Id"),"organization"===t.contribute_as&&(t.contributer_info.organization||(a.organization="Please enter your Organization Name"),t.contributer_info.designation||(a.designation="Please enter your Designation")),n.setState({errorObj:a})):(t.state=n.props.match.params.state,t.amount=parseInt(t.amount),t.requirement_id=n.state.selectedRequirement._id,fetch("http://covidapi.letsendorse.com/add-contribute",{method:"POST",headers:{"Content-Type":"application/JSON"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){"ok"===e.status?n.setState({selectedRequirement:null,showInterestModal:!1,newContribution:{districts:[],materials:[],amount:"",contribute_as:"",contributer_info:{name:"",phone:"",email:""},message:"",preffered_supplier:""},showSharingModal:!0}):E.a.fire("Oops!","An error occured! Please try again in sometime.","error")})).catch((function(e){console.log(e)})))},n.state={districts:[],requirements:[],newContribution:{districts:[],materials:[],amount:"",contribute_as:"",contributer_info:{name:"",phone:"",email:""},message:"",preffered_supplier:""},errorObj:{},district:"",showSharingModal:!1,showInterestModal:!1,selectedRequirement:null},n}return Object(l.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.props.match.params.state&&fetch("http://covidapi.letsendorse.com/districts?state="+this.props.match.params.state,{method:"GET"}).then((function(e){return e.json()})).then((function(t){e.setState({districts:t.districts})})).catch((function(e){console.log(e)})),this.refreshReqs()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"landing-page"},r.a.createElement("div",{className:"banner"},r.a.createElement("div",{className:"banner-container"},r.a.createElement("div",{className:"black-text"},"COMBATING"),r.a.createElement("div",{className:"black-text"},"COVID,"),r.a.createElement("div",{className:"red-text"},"TOGETHER"),r.a.createElement("div",{className:"black-text small"},"AN INITIATIVE OF"),r.a.createElement("div",{className:"logos-container"},r.a.createElement("img",{src:"/images/MSINS.png",width:"200",height:"80",style:{padding:"15px 5px 0 0"}}),r.a.createElement("img",{src:"https://www.letsendorse.com/images/xletsEndorse-Logo-Black-Transparent.png.pagespeed.ic.ySi4ImWpcY.webp",width:"200",height:"80"}))),r.a.createElement("div",{className:"banner-heading"},"LET'S JOIN HAND IN FIGHTING THE PANDEMIC")),r.a.createElement("div",{className:"container-1"},r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"left-container"},r.a.createElement("div",{className:"heading"},r.a.createElement("span",{className:"black-text"},"OUR"),r.a.createElement("span",{className:"red-text"},"ENDEAVOUR")),r.a.createElement("div",null,"We are currently in the midst of a pandemic. And we are aware that our healthcare capacity is not wellequipped to handle this burden. In collaboration with ",r.a.createElement("span",{className:"red-text"},r.a.createElement("a",{className:"red-text",href:"https://msins.in/",target:"_blank"},"Maharashtra State Innovation Society, a body of the Government of Maharashtra"),", the various district hospitals and ",r.a.createElement("a",{className:"red-text",href:"https://letsendorse.com/",target:"_blank"},"LetsEndorse"))," to combat this."),r.a.createElement("div",null,"We are running against time to get the supplies that our public health system needs. And we need support from one and all in enabling our infrastructure and people to combat COVID-19.")),r.a.createElement("div",{className:"right-container"}))),r.a.createElement("div",{className:"container-2"},r.a.createElement("div",{className:"heading"},r.a.createElement("span",{className:"black-text"},"LET'S ENABLE OUR"),r.a.createElement("span",{className:"red-text"},"FRONTLINE")),r.a.createElement("div",{className:"filter-container"},r.a.createElement("div",{className:"filter"},r.a.createElement("label",{className:"control-label"},"District"),r.a.createElement(g.a,{size:"large",value:this.state.district,onChange:this.districtChange,style:{width:150}},r.a.createElement(w,{value:""},"All"),this.state.districts.map((function(e,t){return r.a.createElement(w,{value:e._id,key:t},e.name)})))),r.a.createElement("div",{className:"last-updated-container"},r.a.createElement("span",{className:"black-text"},"Last Updated:"),r.a.createElement("span",{className:"red-text"},p()().format("HH:mm")+" | "+p()().format("DD MMMM YYYY")))),r.a.createElement("div",{className:"requirements-container"},r.a.createElement("div",{className:"heading"},r.a.createElement("div",{className:"column-1"},"Requirement"),r.a.createElement("div",{className:"column-2"},"Unit Cost (INR)"),r.a.createElement("div",{className:"column-3"},"Status"),r.a.createElement("div",{className:"column-4"},"Pledge Contribution")),this.state.requirements.length?null:r.a.createElement("div",{className:"no-materials"},r.a.createElement("span",{className:"title"},"No requirements available currently!"),r.a.createElement("span",{className:"sub-title"},"Please wait until requirements are added.")),this.state.requirements.map((function(t,a){return r.a.createElement("div",{className:"req-row",key:a},r.a.createElement("div",{className:"column-1"},t.material),r.a.createElement("div",{className:"column-2"},t.unit_min_price&&t.unit_max_price?r.a.createElement("span",null,t.unit_min_price+" - "+t.unit_max_price):t.unit_min_price?t.unit_min_price:t.unit_max_price),r.a.createElement("div",{className:"column-3"},r.a.createElement("div",{className:"box"},r.a.createElement("div",{className:"box-filled",style:{width:parseInt(t.fullfilled_qnty/t.required_qnty*100)+"%"}},r.a.createElement("span",null,t.fullfilled_qnty)),r.a.createElement("span",{className:"box-total"},t.required_qnty))),r.a.createElement("div",{className:"column-4"},r.a.createElement("button",{className:"btn interest-btn",onClick:e.express.bind(e,t)},"Express Interest")))})))),r.a.createElement("div",{className:"container-3"},r.a.createElement("div",{className:"heading-container"},r.a.createElement("a",{className:"link",href:"https://bit.ly/CovidMahSupply",target:"_blank"},"CLICK HERE TO VIEW THE LIST AND INVENTORY OF VETTED MATERIAL SUPPLIERS."),r.a.createElement("div",{className:"text"},"(We would nonetheless encourage you to do your due-diligence on the suppliers.)")),r.a.createElement("div",{className:"heading"},r.a.createElement("span",{className:"black-text"},"HOW DOES THIS"),r.a.createElement("span",{className:"red-text"},"PLATFORM WORK?")),r.a.createElement("div",{className:"text-container"},r.a.createElement("div",null,"Built in collaboration with ",r.a.createElement("a",{className:"red-text",href:"https://msins.in/",target:"_blank"},"Maharashtra State Innovation Society")," (a body of the Government of Maharashtra) and ",r.a.createElement("a",{className:"red-text",href:"https://letsendorse.com/",target:"_blank"},"LetsEndorse"),", this platform serves to provide real-time information about the gaps in and needs of the public health system of Maharashtra."),r.a.createElement("div",null,"Our collective goal is to garner the precise needs from the ground (Government Hospitals serving COVID-19 patients) from across different districts of Maharashtra and offer a single and transparent channel to individuals and institutions ",r.a.createElement("b",null,"(through grants and CSR funds- ",r.a.createElement("a",{className:"red-text",href:"https://www.mca.gov.in/Ministry/pdf/Covid_23032020.pdf",target:"_blank"},"Read regulation here"),")")," to make direct contribution and impact in fighting the current pandemic."),r.a.createElement("div",null,'Once you gauge the gaps, you can click on "',r.a.createElement("span",{className:"red-text"},"EXPRESS INTEREST"),'" button, mention the scale of your contribution, recommend any supplier, and our task-force team shall get in touch with you to channelize your support in the most appropriate manner.'),r.a.createElement("div",null,"To check how your contribution has reached the last mile, you can click on the hyperlinked name of the item and you would see the entire list of contributions in realtime."),r.a.createElement("div",null,"To know further, get in touch with us at ",r.a.createElement("a",{href:"mailto:support@letsendorse.com",target:"_blank",className:"red-text"},"support@letsendorse.com"),"."))),r.a.createElement("div",{className:"footer-container"},r.a.createElement("div",null,"PLATFORM AND UPDATES POWERED BY"),r.a.createElement("img",{src:"https://www.letsendorse.com/images/xletsEndorse-Logo-Black-Transparent.png.pagespeed.ic.ySi4ImWpcY.webp",width:"200",height:"70"})),r.a.createElement(f.a,{className:"express-interest-modal",show:this.state.showInterestModal,onHide:this.closeInterestModal,size:"lg","aria-labelledby":"contained-modal-title-lg"},r.a.createElement(f.a.Header,{className:"add-partner-modal-header"},r.a.createElement(f.a.Title,{className:"modal-header-custom"},"PLEDGING CONTRIBUTION TO COMBAT COVID-19")),r.a.createElement(f.a.Body,{className:"express-interest-modal-body"},r.a.createElement(v.a,null,r.a.createElement(N.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Districts"),r.a.createElement(g.a,{size:"large",mode:"multiple",style:{width:"100%"},value:this.state.newContribution.districts,onChange:this.onChangeHandler.bind(this,"districts"),placeholder:"Select District(s)"},this.state.districts.map((function(e,t){return r.a.createElement(w,{value:e.name,key:t},e.name)}))),this.state.errorObj.districts?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.districts):null),r.a.createElement(N.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Materials"),r.a.createElement(g.a,{size:"large",mode:"multiple",style:{width:"100%"},value:this.state.newContribution.materials,onChange:this.onChangeHandler.bind(this,"materials"),placeholder:"Select Material(s)"},this.state.requirements.map((function(e,t){return r.a.createElement(w,{value:e.material,key:t},e.material)}))),this.state.errorObj.materials?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.materials):null),r.a.createElement(N.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Contribution (INR)"),r.a.createElement("input",{className:"form-control",type:"number",value:this.state.newContribution.amount,onChange:this.onChangeHandler.bind(this,"amount"),placeholder:"Contribution (INR)"}),this.state.errorObj.amount?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.amount):null),r.a.createElement(N.a,{md:6,className:"radio-container"},r.a.createElement("input",{type:"radio",id:"contribute_as_individual",value:"individual",name:"contribute_as",onChange:this.onChangeHandler.bind(this,"contribute_as")}),r.a.createElement("label",{className:"control-label",htmlFor:"contribute_as_individual"},"I am contributing in my individual capacity.")),r.a.createElement(N.a,{md:6,className:"radio-container"},r.a.createElement("input",{type:"radio",id:"contribute_as_organization",value:"organization",name:"contribute_as",onChange:this.onChangeHandler.bind(this,"contribute_as")}),r.a.createElement("label",{className:"control-label",htmlFor:"contribute_as_organization"},"I am contributing on behalf of my organization.")),this.state.errorObj.contribute_as?r.a.createElement(N.a,{md:12},r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.contribute_as)):null,r.a.createElement(N.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Full Name"),r.a.createElement("input",{className:"form-control",type:"text",value:this.state.newContribution.contributer_info.name,onChange:this.onChangeHandler.bind(this,"contributer_info_name"),placeholder:"Full Name"}),this.state.errorObj.name?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.name):null),r.a.createElement(N.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Phone"),r.a.createElement("input",{className:"form-control",type:"text",value:this.state.newContribution.contributer_info.phone,onChange:this.onChangeHandler.bind(this,"contributer_info_phone"),placeholder:"Phone Number"}),this.state.errorObj.phone?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.phone):null),r.a.createElement(N.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Email"),r.a.createElement("input",{className:"form-control",type:"email",value:this.state.newContribution.contributer_info.email,onChange:this.onChangeHandler.bind(this,"contributer_info_email"),placeholder:"Email Id"}),this.state.errorObj.email?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.email):null),"organization"===this.state.newContribution.contribute_as?r.a.createElement(N.a,{md:6},r.a.createElement("label",{className:"control-label is-imp"},"Organization"),r.a.createElement("input",{className:"form-control",type:"text",value:this.state.newContribution.contributer_info.organization,onChange:this.onChangeHandler.bind(this,"contributer_info_organization"),placeholder:"Organization Name"}),this.state.errorObj.organization?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.organization):null):null,"organization"===this.state.newContribution.contribute_as?r.a.createElement(N.a,{md:6},r.a.createElement("label",{className:"control-label is-imp"},"Designation"),r.a.createElement("input",{className:"form-control",type:"text",value:this.state.newContribution.contributer_info.designation,onChange:this.onChangeHandler.bind(this,"contributer_info_designation"),placeholder:"Designation"}),this.state.errorObj.designation?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.designation):null):null,r.a.createElement(N.a,{md:12},r.a.createElement("label",{className:"control-label"},"Message"),r.a.createElement("textarea",{className:"form-control",value:this.state.newContribution.message,onChange:this.onChangeHandler.bind(this,"message"),placeholder:"Enter your message here"})),r.a.createElement(N.a,{md:12},r.a.createElement("label",{className:"control-label"},"If you have a supplier of choice, kindly mention the same"),r.a.createElement("input",{className:"form-control",type:"text",value:this.state.newContribution.preffered_supplier,onChange:this.onChangeHandler.bind(this,"preffered_supplier")}))),r.a.createElement("div",{className:"text-center footer-container"},r.a.createElement("button",{className:"btn contribute-btn",onClick:this.contribute},"I Contribute"),r.a.createElement("note",null,'By clicking on "I Contribute", I am granting the permission to the task-force to reach me.')))),r.a.createElement(f.a,{className:"sharing-modal",show:this.state.showSharingModal,onHide:this.closeSharingModal,size:"lg","aria-labelledby":"contained-modal-title-lg"},r.a.createElement(f.a.Body,{className:"sharing-modal-body"},r.a.createElement(v.a,null,r.a.createElement(N.a,{md:12,className:"text-center text-container"},r.a.createElement("img",{className:"mb20",src:"/images/hands.png",width:"120"}),r.a.createElement("h2",null,"WE SINCERELY THANK YOU FOR DECIDING TO CONTRIBUTE TOWARDS STRENGTHENING THE HEALTH INFRASTRUCTURE TO FIGHT COVID-19"),r.a.createElement("h3",null,"We shall get in touch with you shortly to process the contribution"),r.a.createElement("h4",null,"Share about your contribution and motivate others")),r.a.createElement(N.a,{md:12,className:"share-buttons"},r.a.createElement(y.a,{url:"http://covid.letsendorse.com",quote:"Maharashtra combats COVID-19 is an initiative of Maharashtra State Innovation Society (a body of the Maharashtra Government), district hospitals and LetsEndorse, to enable individuals and institutions to channel support directly towards strengthening the public health system to help combat COVID-19. I have just pledged my support and urge everyone to do their bit.",hashtag:["#Covid-19","#Corona","#Maharashtra","#LetsEndorse"]},r.a.createElement("img",{src:"/images/facebook.png",height:"46"})),r.a.createElement(_.a,{title:"Maharashtra Combats COVID-19 - An initiative of MH State Innovation Society & LetsEndorse",url:"http://covid.letsendorse.com",hashtags:["Covid-19","Corona","Maharashtra","LetsEndorse"]},r.a.createElement("img",{src:"/images/twitter.png",width:"125"})),r.a.createElement(C.a,{title:"Maharashtra Combats COVID-19 - An initiative of MH State Innovation Society & LetsEndorse",url:"http://covid.letsendorse.com",source:"http://covid.letsendorse.com",summary:"Maharashtra combats COVID-19 is an initiative of Maharashtra State Innovation Society (a body of the Maharashtra Government), district hospitals and LetsEndorse, to enable individuals and institutions to channel support directly towards strengthening the public health system to help combat COVID-19. I have just pledged my support and urge everyone to do their bit."},r.a.createElement("img",{src:"/images/linkedin.png",height:"46",style:{borderRadius:5}})),r.a.createElement(O.a,{title:"Maharashtra Combats COVID-19 - An initiative of MH State Innovation Society & LetsEndorse",url:"http://covid.letsendorse.com"},r.a.createElement("img",{src:"/images/whatsapp.png",height:"48"}))),r.a.createElement("div",{className:"quote"},"Stay safe ! Stay home !")))))}}]),a}(n.Component),S=a(116),M=(n.Component,n.Component,g.a.Option),x=(n.Component,Object(h.a)()),T=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){return r.a.createElement(d.c,{history:x},r.a.createElement(d.d,null,r.a.createElement(d.a,{exact:!0,from:"/",to:"/maharashtra"}),r.a.createElement(d.b,{exact:!0,path:"/:state",component:I}),r.a.createElement(d.a,{path:"*",to:"/"})))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(197),a(198);s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),a(199).config()}},[[124,1,2]]]);
//# sourceMappingURL=main.276fc368.chunk.js.map