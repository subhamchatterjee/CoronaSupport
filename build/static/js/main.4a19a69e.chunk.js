(this["webpackJsonpcorona-frontend"]=this["webpackJsonpcorona-frontend"]||[]).push([[0],{127:function(e,t,a){e.exports=a(205)},205:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(7),s=a.n(i),l=a(12),o=a(13),c=a(16),m=a(17),d=a(218),u=a(23),h=a(49),p=a(18),b=a.n(p),g=a(4),f=a.n(g),E=(a(25).readCookie,a(25).eraseCookie,a(25).createCookie),v=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,N=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).loginUser=function(e){e.preventDefault();var t=f()("#login-form #email").val(),a=f()("#login-form #password").val();if(""!==t&&null!==t.match(v)&&""!==a){f()("#login-spinner").removeClass("d-none"),f()("#login-spinner").css("display","block"),f()("#login-span").addClass("d-none");var n={username:t,password:a};fetch("http://covidapi.letsendorse.com/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then((function(e){return e.json()})).then((function(e){"ok"===e.status?(E("access_token",e.accessToken,30),E("refresh_token",e.refreshToken,30),window.location.pathname=""):"error"===e.status&&(f()("#login-spinner").addClass("d-none"),f()("#login-span").removeClass("d-none"),e.showMessage?f()(".red-color.error").html(e.message):f()(".red-color.error").html("Oops! Something went wrong"),f()(".red-color.error").css("display","block"))}))}else""===t||null===t.match(v)?(f()("#login-form #email").addClass("wrong"),f()("#login-form #email").siblings("label").addClass("wrong"),f()("#login-spinner").addClass("d-none"),f()("#login-spinner").css("display","block"),f()("#login-span").removeClass("d-none")):""===a&&(f()("#login-form #password").addClass("wrong"),f()("#login-form #password").siblings("label").addClass("wrong"),f()("#login-spinner").addClass("d-none"),f()("#login-spinner").css("display","block"),f()("#login-span").removeClass("d-none"))},n.setLoginForm=function(){f()(document).ready((function(){f()(".form").find("input, textarea").on("keyup blur focus",(function(e){var t=f()(e.target),a=t.prev("label");f()(Object(h.a)(n)).hasClass("wrong")&&f()(Object(h.a)(n)).removeClass("wrong"),"keyup"===e.type?""===t.val()?a.removeClass("highlight"):a.addClass("active highlight"):"blur"===e.type?""===t.val()?a.removeClass("active highlight"):a.removeClass("highlight"):"focus"===e.type&&a.addClass("active highlight")})),f()("body").click(),""!==f()("input#email").val()&&(f()("input#email").siblings("label").hasClass("active")||f()("input#email").siblings("label").addClass("active")),""!==f()("input#password").val()&&(f()("input#password").siblings("label").hasClass("active")||f()("input#password").siblings("label").addClass("active"))}))},n.state={forgotPassword:!1},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;f()("#login-spinner").css("display","none");var t="";3===window.location.hostname.split(".").length&&"www"!==window.location.hostname.split(".")[0]&&(t=window.location.hostname.split(".")[0]),"nf"===t?this.setState({subdomain:"nasscom"},(function(){return e.setLoginForm()})):"nfcenter"===t?this.setState({subdomain:"center"},(function(){return e.setLoginForm()})):t?window.location.pathname="/404":this.setLoginForm()}},{key:"componentDidUpdate",value:function(){this.setLoginForm()}},{key:"change",value:function(){f()("#login-form #email").siblings("label").hasClass("wrong")&&f()("#login-form #email").siblings("label").removeClass("wrong"),f()("#login-form #password").siblings("label").hasClass("wrong")&&f()("#login-form #password").siblings("label").removeClass("wrong")}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{id:"login-container"},r.a.createElement("div",{className:"sahaj-front sahaj-front-mobile"}),!1===e.state.forgotPassword?r.a.createElement("div",{className:"form form-mobile"},r.a.createElement("div",{className:"tab-content"},r.a.createElement("div",{id:"login",className:"text-center"},r.a.createElement("h1",null,"Welcome Back!"),r.a.createElement("form",{id:"login-form",onSubmit:e.loginUser},r.a.createElement("div",{className:"field-wrap"},r.a.createElement("label",null," Email Address",r.a.createElement("span",{className:"req"},"*")," "),r.a.createElement("input",{id:"email",type:"email",required:!0,autoComplete:"off",onChange:e.change})),r.a.createElement("div",{className:"field-wrap"},r.a.createElement("label",null," Password",r.a.createElement("span",{className:"req"},"*")," "),r.a.createElement("input",{id:"password",type:"password",required:!0,autoComplete:"off",onChange:e.change})),r.a.createElement("div",{className:"field-wrap"},r.a.createElement("span",{className:"red-color error"})),r.a.createElement("button",{className:"button button-block d-flex justify-content-center align-items-center"},r.a.createElement("i",{id:"login-spinner",className:"fas fa-spinner fa-spin mr10",style:{display:"none"}}),r.a.createElement("span",{id:"login-span"},"Log In")))))):r.a.createElement("div",{className:"form forgot form-mobile text-center"},r.a.createElement("div",{className:"tab-content"},r.a.createElement("div",{id:"forgot-password"},r.a.createElement("h2",null,"Forgot Password"),r.a.createElement("div",{className:"field-wrap"},r.a.createElement("label",null," Email Address",r.a.createElement("span",{className:"req"},"*")," "),r.a.createElement("input",{id:"email",type:"email",required:!0,autoComplete:"off",onChange:e.changeForgotPasswordEmail.bind(e)}),r.a.createElement("span",{hidden:e.state.forgotPasswordEmailValid},r.a.createElement("span",{className:"required-span"}," Incorrect Email entered! "))),r.a.createElement("button",{className:"button button-block d-flex justify-content-center align-items-center",onClick:e.forgotPasswordSubmit.bind(e)},r.a.createElement("span",{id:"login-span"},"Submit"),r.a.createElement("i",{className:"fas fa-check ml15",hidden:!e.state.submittedForgotPassword})),r.a.createElement("h4",null,"Enter your registered email and a new password link will be sent to the registered email."),r.a.createElement("a",{className:"forgot"},r.a.createElement("span",{id:"forgot-span",onClick:e.forgotPassword.bind(e)},r.a.createElement("i",{className:"fas fa-chevron-left"})," Back"))),r.a.createElement("img",{src:"/images/le_black.png",style:{marginTop:30,width:200}}))))}}]),a}(n.Component),y=a(85),C=a.n(y),w=a(217),_=a(216),k=a(210),O=a(211),q=a(212),I=a(213),S=a(214),x=a(215),M=w.a.Option,T=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).districtChange=function(e){n.setState({district:e},(function(){n.refreshReqs()}))},n.refreshReqs=function(){var e="?dashboard=true&state="+n.props.match.params.state;n.state.district&&(e+="&district="+n.state.district),fetch("http://covidapi.letsendorse.com/requirements"+e,{method:"GET"}).then((function(e){return e.json()})).then((function(e){n.setState({requirements:e.requirements})})).catch((function(e){console.log(e)}))},n.express=function(e){var t={districts:[],materials:[e._id],amount:"",contribute_as:"",contributer_info:{name:"",phone:"",email:""},message:"",preffered_supplier:""};n.setState({newContribution:t,selectedRequirement:e,showInterestModal:!0})},n.closeInterestModal=function(){n.setState({selectedRequirement:null,showInterestModal:!1})},n.onChangeHandler=function(e,t){t.target&&(t=t.target.value);var a=n.state.newContribution;"districts"===e||"materials"===e||"amount"===e||"contribute_as"===e||"message"===e||"preffered_supplier"===e?a[e]=t:"contributer_info_name"!==e&&"contributer_info_phone"!==e&&"contributer_info_email"!==e&&"contributer_info_organization"!==e&&"contributer_info_designation"!==e||(a.contributer_info[e.split("_")[2]]=t),n.setState({newContribution:a})},n.closeSharingModal=function(){n.setState({showSharingModal:!1})},n.contribute=function(){var e=!1,t=n.state.newContribution,a={};t.districts.length&&t.materials.length&&t.amount&&t.contribute_as&&t.contributer_info.name&&t.contributer_info.phone&&t.contributer_info.email&&("organization"!==t.contribute_as||t.contributer_info.organization&&t.contributer_info.designation)||(e=!0),e?(t.districts.length||(a.districts="Please select at least one District"),t.materials.length||(a.materials="Please select at least one Material"),t.amount||(a.amount="Please enter contribution amount"),t.contribute_as||(a.contribute_as="Please select at least one option"),t.contributer_info.name||(a.name="Please enter your Full Name"),t.contributer_info.phone||(a.phone="Please enter your Phone Number"),t.contributer_info.email||(a.email="Please enter your Email Id"),"organization"===t.contribute_as&&(t.contributer_info.organization||(a.organization="Please enter your Organization Name"),t.contributer_info.designation||(a.designation="Please enter your Designation")),n.setState({errorObj:a})):(t.state=n.props.match.params.state,t.amount=parseInt(t.amount),fetch("http://covidapi.letsendorse.com/add-contribute",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(e){"ok"===e.status?n.setState({selectedRequirement:null,showInterestModal:!1,newContribution:{districts:[],materials:[],amount:"",contribute_as:"",contributer_info:{name:"",phone:"",email:""},message:"",preffered_supplier:""},showSharingModal:!0}):b.a.fire("Oops!","An error occured! Please try again in sometime.","error")})).catch((function(e){console.log(e)})))},n.state={districts:[],materials:[],requirements:[],newContribution:{districts:[],materials:[],amount:"",contribute_as:"",contributer_info:{name:"",phone:"",email:""},message:"",preffered_supplier:""},errorObj:{},district:"",showSharingModal:!1,showInterestModal:!1,selectedRequirement:null},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.props.match.params.state&&fetch("http://covidapi.letsendorse.com/districts?state="+this.props.match.params.state,{method:"GET"}).then((function(e){return e.json()})).then((function(t){e.setState({districts:t.districts})})).catch((function(e){console.log(e)})),fetch("http://covidapi.letsendorse.com/materials",{method:"GET"}).then((function(e){return e.json()})).then((function(t){e.setState({materials:t.materials})})).catch((function(e){console.log(e)})),this.refreshReqs()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"landing-page"},r.a.createElement("div",{className:"banner"},r.a.createElement("div",{className:"banner-container"},r.a.createElement("div",{className:"black-text"},"COMBATING"),r.a.createElement("div",{className:"black-text"},"COVID,"),r.a.createElement("div",{className:"red-text"},"TOGETHER"),r.a.createElement("div",{className:"black-text small"},"AN INITIATIVE OF"),r.a.createElement("div",{className:"logos-container"},r.a.createElement("img",{src:"/images/MSINS.png",width:"200",height:"80",style:{padding:"15px 5px 0 0"}}),r.a.createElement("img",{src:"https://www.letsendorse.com/images/xletsEndorse-Logo-Black-Transparent.png.pagespeed.ic.ySi4ImWpcY.webp",width:"200",height:"80"}))),r.a.createElement("div",{className:"banner-heading"},"LET'S JOIN HAND IN FIGHTING THE PANDEMIC")),r.a.createElement("div",{className:"container-1"},r.a.createElement("div",{className:"content"},r.a.createElement("div",{className:"left-container"},r.a.createElement("div",{className:"heading"},r.a.createElement("span",{className:"black-text"},"OUR"),r.a.createElement("span",{className:"red-text"},"ENDEAVOUR")),r.a.createElement("div",null,"We are currently in the midst of a pandemic. And we are aware that our healthcare capacity is not well-equipped to handle this burden. Built in collaboration with ",r.a.createElement("span",{className:"red-text"},r.a.createElement("a",{className:"red-text",href:"https://msins.in/",target:"_blank"},"Maharashtra State Innovation Society, a body of the Government of Maharashtra"),", the various district hospitals and ",r.a.createElement("a",{className:"red-text",href:"https://letsendorse.com/",target:"_blank"},"LetsEndorse")),", this platform serves to bring forth the real-time gaps in the existing public health system and solicit collective support to bridge the same."),r.a.createElement("div",null,"We are running against time to get the supplies that our public health system needs. And we need support from one and all in enabling our infrastructure and people to combat COVID-19.")),r.a.createElement("div",{className:"right-container"}))),r.a.createElement("div",{className:"container-2"},r.a.createElement("div",{className:"heading"},r.a.createElement("span",{className:"black-text"},"LET'S ENABLE OUR"),r.a.createElement("span",{className:"red-text"},"FRONTLINE")),r.a.createElement("div",{className:"filter-container"},r.a.createElement("div",{className:"filter"},r.a.createElement("label",{className:"control-label"},"District"),r.a.createElement(w.a,{showSearch:!0,size:"large",value:this.state.district,onChange:this.districtChange,style:{width:150}},r.a.createElement(M,{value:""},"All"),this.state.districts.map((function(e,t){return r.a.createElement(M,{value:e.name,key:t},e.name)})))),r.a.createElement("div",{className:"last-updated-container"},r.a.createElement("span",{className:"black-text"},"Last Updated:"),r.a.createElement("span",{className:"red-text"},C()().format("HH:mm")+" | "+C()().format("DD MMMM YYYY")))),r.a.createElement("div",{className:"requirements-container"},r.a.createElement("div",{className:"heading"},r.a.createElement("div",{className:"column-1"},"Requirement"),r.a.createElement("div",{className:"column-2"},"Unit Cost (INR)"),r.a.createElement("div",{className:"column-3"},"Status"),r.a.createElement("div",{className:"column-4"},"Pledge Contribution")),this.state.requirements.length?null:r.a.createElement("div",{className:"no-materials"},r.a.createElement("span",{className:"title"},"No requirements available currently!"),r.a.createElement("span",{className:"sub-title"},"Please wait until requirements are added.")),this.state.requirements.map((function(t,a){return r.a.createElement("div",{className:"req-row",key:a},r.a.createElement("div",{className:"column-1"},t._id),r.a.createElement("div",{className:"column-2"},t.unit_min_price&&t.unit_max_price?r.a.createElement("span",null,t.unit_min_price+" - "+t.unit_max_price):t.unit_min_price?t.unit_min_price:t.unit_max_price),r.a.createElement("div",{className:"column-3"},r.a.createElement("div",{className:"box"},r.a.createElement("div",{className:"box-filled",style:{width:parseInt(t.fullfilled_qnty/t.required_qnty*100)+"%"}},r.a.createElement("span",null,t.fullfilled_qnty)),r.a.createElement("span",{className:"box-total"},t.required_qnty))),r.a.createElement("div",{className:"column-4"},r.a.createElement("button",{className:"btn interest-btn",onClick:e.express.bind(e,t)},"Express Interest")))})))),r.a.createElement("div",{className:"container-3"},r.a.createElement("div",{className:"heading-container"},r.a.createElement("a",{className:"link",href:"https://bit.ly/CovidMahSupply",target:"_blank"},"CLICK HERE TO VIEW THE LIST AND INVENTORY OF VETTED MATERIAL SUPPLIERS."),r.a.createElement("div",{className:"text"},"(We would nonetheless encourage you to do your due-diligence on the suppliers.)")),r.a.createElement("div",{className:"heading"},r.a.createElement("span",{className:"black-text"},"HOW DOES THIS"),r.a.createElement("span",{className:"red-text"},"PLATFORM WORK?")),r.a.createElement("div",{className:"text-container"},r.a.createElement("div",null,"Built in collaboration with ",r.a.createElement("a",{className:"red-text",href:"https://msins.in/",target:"_blank"},"Maharashtra State Innovation Society")," (a body of the Government of Maharashtra) and ",r.a.createElement("a",{className:"red-text",href:"https://letsendorse.com/",target:"_blank"},"LetsEndorse"),", this platform serves to provide real-time information about the gaps in and needs of the public health system of Maharashtra."),r.a.createElement("div",null,"Our collective goal is to garner the precise needs from the ground (Government Hospitals serving COVID-19 patients) from across different districts of Maharashtra and offer a single and transparent channel to individuals and institutions ",r.a.createElement("b",null,"(through grants and CSR funds- ",r.a.createElement("a",{className:"red-text",href:"https://www.mca.gov.in/Ministry/pdf/Covid_23032020.pdf",target:"_blank"},"Read regulation here"),")")," to make direct contribution and impact in fighting the current pandemic."),r.a.createElement("div",null,'Once you gauge the gaps, you can click on "',r.a.createElement("span",{className:"red-text"},"EXPRESS INTEREST"),'" button, mention the scale of your contribution, recommend any supplier, and our task-force team shall get in touch with you to channelize your support in the most appropriate manner.'),r.a.createElement("div",null,"To check how your contribution has reached the last mile, you can click on the hyperlinked name of the item and you would see the entire list of contributions in realtime."),r.a.createElement("div",null,"To know further, get in touch with us at ",r.a.createElement("a",{href:"mailto:support@letsendorse.com",target:"_blank",className:"red-text"},"support@letsendorse.com"),"."))),r.a.createElement("div",{className:"footer-container"},r.a.createElement("div",null,"PLATFORM AND UPDATES POWERED BY"),r.a.createElement("img",{src:"https://www.letsendorse.com/images/xletsEndorse-Logo-Black-Transparent.png.pagespeed.ic.ySi4ImWpcY.webp",width:"200",height:"70"})),r.a.createElement(_.a,{className:"express-interest-modal",show:this.state.showInterestModal,onHide:this.closeInterestModal,size:"lg","aria-labelledby":"contained-modal-title-lg"},r.a.createElement(_.a.Header,{className:"add-partner-modal-header"},r.a.createElement(_.a.Title,{className:"modal-header-custom"},"PLEDGING CONTRIBUTION TO COMBAT COVID-19")),r.a.createElement(_.a.Body,{className:"express-interest-modal-body"},r.a.createElement(k.a,null,r.a.createElement(O.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Districts"),r.a.createElement(w.a,{size:"large",mode:"multiple",style:{width:"100%"},value:this.state.newContribution.districts,onChange:this.onChangeHandler.bind(this,"districts"),placeholder:"Select District(s)"},this.state.districts.map((function(e,t){return r.a.createElement(M,{value:e.name,key:t},e.name)}))),this.state.errorObj.districts?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.districts):null),r.a.createElement(O.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Materials"),r.a.createElement(w.a,{size:"large",mode:"multiple",style:{width:"100%"},value:this.state.newContribution.materials,onChange:this.onChangeHandler.bind(this,"materials"),placeholder:"Select Material(s)"},this.state.materials.map((function(e,t){return r.a.createElement(M,{value:e.name,key:t},e.name)}))),this.state.errorObj.materials?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.materials):null),r.a.createElement(O.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Contribution (INR)"),r.a.createElement("input",{className:"form-control",type:"number",value:this.state.newContribution.amount,onChange:this.onChangeHandler.bind(this,"amount"),placeholder:"Contribution (INR)"}),this.state.errorObj.amount?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.amount):null),r.a.createElement(O.a,{md:6,className:"radio-container"},r.a.createElement("input",{type:"radio",id:"contribute_as_individual",value:"individual",name:"contribute_as",onChange:this.onChangeHandler.bind(this,"contribute_as")}),r.a.createElement("label",{className:"control-label",htmlFor:"contribute_as_individual"},"I am contributing in my individual capacity.")),r.a.createElement(O.a,{md:6,className:"radio-container"},r.a.createElement("input",{type:"radio",id:"contribute_as_organization",value:"organization",name:"contribute_as",onChange:this.onChangeHandler.bind(this,"contribute_as")}),r.a.createElement("label",{className:"control-label",htmlFor:"contribute_as_organization"},"I am contributing on behalf of my organization.")),this.state.errorObj.contribute_as?r.a.createElement(O.a,{md:12},r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.contribute_as)):null,r.a.createElement(O.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Full Name"),r.a.createElement("input",{className:"form-control",type:"text",value:this.state.newContribution.contributer_info.name,onChange:this.onChangeHandler.bind(this,"contributer_info_name"),placeholder:"Full Name"}),this.state.errorObj.name?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.name):null),r.a.createElement(O.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Phone"),r.a.createElement("input",{className:"form-control",type:"text",value:this.state.newContribution.contributer_info.phone,onChange:this.onChangeHandler.bind(this,"contributer_info_phone"),placeholder:"Phone Number"}),this.state.errorObj.phone?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.phone):null),r.a.createElement(O.a,{md:4},r.a.createElement("label",{className:"control-label is-imp"},"Email"),r.a.createElement("input",{className:"form-control",type:"email",value:this.state.newContribution.contributer_info.email,onChange:this.onChangeHandler.bind(this,"contributer_info_email"),placeholder:"Email Id"}),this.state.errorObj.email?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.email):null),"organization"===this.state.newContribution.contribute_as?r.a.createElement(O.a,{md:6},r.a.createElement("label",{className:"control-label is-imp"},"Organization"),r.a.createElement("input",{className:"form-control",type:"text",value:this.state.newContribution.contributer_info.organization,onChange:this.onChangeHandler.bind(this,"contributer_info_organization"),placeholder:"Organization Name"}),this.state.errorObj.organization?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.organization):null):null,"organization"===this.state.newContribution.contribute_as?r.a.createElement(O.a,{md:6},r.a.createElement("label",{className:"control-label is-imp"},"Designation"),r.a.createElement("input",{className:"form-control",type:"text",value:this.state.newContribution.contributer_info.designation,onChange:this.onChangeHandler.bind(this,"contributer_info_designation"),placeholder:"Designation"}),this.state.errorObj.designation?r.a.createElement("div",{style:{color:"red"}},this.state.errorObj.designation):null):null,r.a.createElement(O.a,{md:12},r.a.createElement("label",{className:"control-label"},"Message"),r.a.createElement("textarea",{className:"form-control",value:this.state.newContribution.message,onChange:this.onChangeHandler.bind(this,"message"),placeholder:"Enter your message here"})),r.a.createElement(O.a,{md:12},r.a.createElement("label",{className:"control-label"},"If you have a supplier of choice, kindly mention the same"),r.a.createElement("input",{className:"form-control",type:"text",value:this.state.newContribution.preffered_supplier,onChange:this.onChangeHandler.bind(this,"preffered_supplier")}))),r.a.createElement("div",{className:"text-center footer-container"},r.a.createElement("button",{className:"btn contribute-btn",onClick:this.contribute},"I Contribute"),r.a.createElement("note",null,'By clicking on "I Contribute", I am granting the permission to the task-force to reach me.')))),r.a.createElement(_.a,{className:"sharing-modal",show:this.state.showSharingModal,onHide:this.closeSharingModal,size:"lg","aria-labelledby":"contained-modal-title-lg"},r.a.createElement(_.a.Body,{className:"sharing-modal-body"},r.a.createElement(k.a,null,r.a.createElement(O.a,{md:12,className:"text-center text-container"},r.a.createElement("img",{className:"mb20",src:"/images/hands.png",width:"120"}),r.a.createElement("h2",null,"WE SINCERELY THANK YOU FOR DECIDING TO CONTRIBUTE TOWARDS STRENGTHENING THE HEALTH INFRASTRUCTURE TO FIGHT COVID-19"),r.a.createElement("h3",null,"We shall get in touch with you shortly to process the contribution"),r.a.createElement("h4",null,"Share about your contribution and motivate others")),r.a.createElement(O.a,{md:12,className:"share-buttons"},r.a.createElement(q.a,{url:"http://covid.letsendorse.com",quote:"Maharashtra combats COVID-19 is an initiative of Maharashtra State Innovation Society (a body of the Maharashtra Government), district hospitals and LetsEndorse, to enable individuals and institutions to channel support directly towards strengthening the public health system to help combat COVID-19. I have just pledged my support and urge everyone to do their bit.",hashtag:["#Covid-19","#Corona","#Maharashtra","#LetsEndorse"]},r.a.createElement("img",{src:"/images/facebook.png",height:"46"})),r.a.createElement(I.a,{title:"Maharashtra Combats COVID-19 - An initiative of MH State Innovation Society & LetsEndorse",url:"http://covid.letsendorse.com",hashtags:["Covid-19","Corona","Maharashtra","LetsEndorse"]},r.a.createElement("img",{src:"/images/twitter.png",width:"125"})),r.a.createElement(S.a,{title:"Maharashtra Combats COVID-19 - An initiative of MH State Innovation Society & LetsEndorse",url:"http://covid.letsendorse.com",source:"http://covid.letsendorse.com",summary:"Maharashtra combats COVID-19 is an initiative of Maharashtra State Innovation Society (a body of the Maharashtra Government), district hospitals and LetsEndorse, to enable individuals and institutions to channel support directly towards strengthening the public health system to help combat COVID-19. I have just pledged my support and urge everyone to do their bit."},r.a.createElement("img",{src:"/images/linkedin.png",height:"46",style:{borderRadius:5}})),r.a.createElement(x.a,{title:"Maharashtra Combats COVID-19 - An initiative of MH State Innovation Society & LetsEndorse",url:"http://covid.letsendorse.com"},r.a.createElement("img",{src:"/images/whatsapp.png",height:"48"}))),r.a.createElement("div",{className:"quote"},"Stay safe ! Stay home !")))))}}]),a}(n.Component),j=a(119),R=a(25).readCookie,A=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).changeHandler=function(e,t){n.setState(Object(j.a)({},e,t.target.value))},n.submit=function(){var e="http://covidapi.letsendorse.com/add-materials",t="POST",a={name:n.state.name,desc:n.state.desc,min_price:n.state.minCost,max_price:n.state.maxCost};n.props.match.params.materialId&&(e="http://covidapi.letsendorse.com/edit-material/"+n.props.match.params.materialId,t="PUT"),fetch(e,{method:t,headers:{Auth:R("access_token"),"Content-Type":"application/json"},body:JSON.stringify(a)}).then((function(e){return e.json()})).then((function(e){var t="Material successfully added.";n.props.match.params.materialId&&(t="Material updated successfully."),b.a.fire({title:t,type:"success"})})).catch((function(e){console.log(e)}))},n.state={name:"",desc:"",minCost:"",maxCost:""},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;this.props.match.params.materialId&&fetch("http://covidapi.letsendorse.com/get-material/"+this.props.match.params.materialId,{method:"GET"}).then((function(e){return e.json()})).then((function(t){var a={name:t.name,desc:t.desc,minCost:t.minCost,maxCost:t.maxCost};e.setState(a)})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){return r.a.createElement("div",{className:"add-material-page"},r.a.createElement("h2",{className:"text-center"},this.props.match.params.materialId?"EDIT MATERIAL PAGE":"ADD MATERIAL PAGE"),r.a.createElement("div",{className:"d-flex question"},r.a.createElement("label",{className:"control-label"},"Name of the material"),r.a.createElement("input",{className:"form-control",type:"text",value:this.state.name,onChange:this.changeHandler.bind(this,"name")})),r.a.createElement("div",{className:"d-flex question"},r.a.createElement("label",{className:"control-label"},"Description of the material"),r.a.createElement("textarea",{className:"form-control",value:this.state.desc,onChange:this.changeHandler.bind(this,"desc")})),r.a.createElement("div",{className:"d-flex question"},r.a.createElement("label",{className:"control-label"},"Unit Price in INR"),r.a.createElement("div",{className:"d-flex input-groups"},r.a.createElement("input",{className:"form-control",type:"number",placeholder:"Minimum",value:this.state.minCost,onChange:this.changeHandler.bind(this,"minCost")}),r.a.createElement("input",{className:"form-control",type:"number",placeholder:"Maximum",value:this.state.maxCost,onChange:this.changeHandler.bind(this,"maxCost")}))),r.a.createElement("div",{className:"text-center"},r.a.createElement("button",{className:"btn submit-btn",onClick:this.submit},"SUBMIT THE MATERIAL")))}}]),a}(n.Component),D=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).getMaterials=function(){fetch("http://covidapi.letsendorse.com/materials",{method:"GET"}).then((function(e){return e.json()})).then((function(e){n.setState({materials:e.materials})})).catch((function(e){console.log(e)}))},n.editMaterial=function(e){window.location.pathname="/edit-material/"+e},n.manageMaterial=function(e){window.location.pathname="/manage-material/"+e},n.state={materials:[{_id:"5asd67as7d6as7d565d6as",name:"N95 Mask"},{_id:"5arb67as7ds5s7d951d4sb",name:"PPE"},{_id:"5asd5asd5asd5asd5as5de",name:"Triple Layer Mask"}]},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){this.getMaterials()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"manage-materials-page"},r.a.createElement("h2",{className:"text-center"},"MANAGE MATERIALS PAGE"),r.a.createElement("div",{className:"heading"},r.a.createElement("div",{className:"column-1"},"Name of the material"),r.a.createElement("div",{className:"column-2"},"Manage Material")),this.state.materials.length?null:r.a.createElement("div",{className:"no-materials"},"Material not found"),this.state.materials.map((function(t,a){return r.a.createElement("div",{className:"material-row",key:a},r.a.createElement("div",{className:"column-1"},t.name),r.a.createElement("div",{className:"column-2"},r.a.createElement("button",{className:"btn manage-material-btn",onClick:e.manageMaterial.bind(e,t._id)},"Manage")))})))}}]),a}(n.Component),P=w.a.Option,H=a(25).readCookie,L=function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).addFulfilment=function(e){n.setState({selectedRequirement:e,showFulfilmentModal:!0})},n.addDistrict=function(){var e=!0,t=n.state.material;t.requirements.length&&(t.requirements[t.requirements.length-1].district&&t.requirements[t.requirements.length-1].required_qnty||(e=!1)),e&&(t.requirements.push({_id:"0",district:"",required_qnty:"",fullfilled_qnty:""}),n.setState({material:t,editRequirement:"0"}))},n.editRequirement=function(e){n.setState({editRequirement:e})},n.handleReqChange=function(e,t,a){var r=n.state.material;a.target&&(a=parseInt(a.target.value)),r.requirements[e][t]=a,n.setState({material:r})},n.saveRequirement=function(e){var t={district:e.district,required_qnty:e.required_qnty},a=!1,r=n.state.material;if(r.requirements.length>1){for(var i=0;i<r.requirements.length;i++)e._id!==r.requirements[i]._id&&e.district===r.requirements[i].district&&(a="district");e.district?e.required_qnty||(a="required_qnty"):a="district"}if(t.material=r.name,a)"district"===a?b.a.fire("","Please select a correct District","error"):"required_qnty"===a&&b.a.fire("","Please enter correct required units","error");else{var s="http://covidapi.letsendorse.com/update-requirement/"+e._id,l="PUT";0===parseInt(e._id)&&(l="POST",s="http://covidapi.letsendorse.com/add-requirement"),fetch(s,{method:l,headers:{Auth:H("access_token"),"Content-Type":"application/json"},body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(t){n.setState({editRequirement:null});var a="Requirement successfully updated.";0===parseInt(e._id)&&(a="Requirement added successfully."),b.a.fire({title:a,type:"success"})})).catch((function(e){console.log(e),n.setState({editRequirement:null})}))}},n.state={districts:[],material:null,editRequirement:null,selectedRequirement:null,showFulfilmentModal:!1},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){var e=this;fetch("http://covidapi.letsendorse.com/districts",{method:"GET"}).then((function(e){return e.json()})).then((function(t){e.setState({districts:t.districts})})).catch((function(e){console.log(e)})),fetch("http://covidapi.letsendorse.com/material/"+this.props.match.params.materialId,{method:"GET"}).then((function(e){return e.json()})).then((function(t){var a=t.material;fetch("http://covidapi.letsendorse.com/requirements?material="+a.name,{method:"GET"}).then((function(e){return e.json()})).then((function(t){a.requirements=t.requirements,e.setState({material:a})})).catch((function(e){console.log(e)}))})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e=this;return null!==this.state.material?r.a.createElement("div",{className:"manage-single-material-page"},r.a.createElement("h2",{className:"text-center"},this.state.material.name),r.a.createElement("div",{className:"heading"},r.a.createElement("div",{className:"column-1"},"District"),r.a.createElement("div",{className:"column-2"},"Required Units"),r.a.createElement("div",{className:"column-3"},"Fulfilled Units"),r.a.createElement("div",{className:"column-4"},"Add Fulfilment"),r.a.createElement("div",{className:"column-5"},"SAVE")),this.state.material.requirements.length?null:r.a.createElement("div",{className:"no-materials"},"Requirements not found"),this.state.material.requirements.map((function(t,a){return r.a.createElement("div",{className:"material-row",key:a},e.state.editRequirement===t._id?r.a.createElement("div",{className:"column-1"},r.a.createElement(w.a,{showSearch:!0,size:"large",value:t.district,onChange:e.handleReqChange.bind(e,a,"district"),style:{width:"100%"}},e.state.districts.map((function(e,t){return r.a.createElement(P,{value:e.name,key:t},e.name)})))):r.a.createElement("div",{className:"column-1"},t.district),e.state.editRequirement===t._id?r.a.createElement("div",{className:"column-2"},r.a.createElement("input",{className:"form-control",type:"number",value:t.required_qnty,onChange:e.handleReqChange.bind(e,a,"required_qnty")})):r.a.createElement("div",{className:"column-2"},t.required_qnty),r.a.createElement("div",{className:"column-3"},t.fullfilled_qnty),r.a.createElement("div",{className:"column-4"},r.a.createElement("button",{className:"btn add-fulfilment-btn",disabled:e.state.editRequirement,onClick:e.addFulfilment.bind(e,t)},"Add")),r.a.createElement("div",{className:"column-5"},e.state.editRequirement===t._id?r.a.createElement("button",{className:"btn save-requirement-btn",onClick:e.saveRequirement.bind(e,t)},"Save"):r.a.createElement("button",{className:"btn edit-requirement-btn",disabled:e.state.editRequirement,onClick:e.editRequirement.bind(e,t._id)},"Edit")))})),r.a.createElement("div",{className:"add-district-container"},r.a.createElement("button",{className:"btn add-district-btn",onClick:this.addDistrict,disabled:this.state.editRequirement},r.a.createElement("i",{className:"fa fa-plus"}),"Add District"))):null}}]),a}(n.Component),z=Object(u.a)(),F=a(25).readCookie,G=a(25).eraseCookie,U=(a(25).createCookie,function(e){Object(m.a)(a,e);var t=Object(c.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).logoutUser=function(){fetch("http://covidapi.letsendorse.com/logout",{method:"POST",headers:{Auth:JSON.parse(F("access_token"))}}).then((function(e){return e.json()})).then((function(e){G("access_token"),G("refresh_token"),n.setState({access_token:null})})).catch((function(e){console.log("There has been a problem with your fetch operation: "+e.message)}))},n.state={access_token:null},n}return Object(o.a)(a,[{key:"componentDidMount",value:function(){null!==F("access_token")?this.setState({access_token:F("access_token")}):(G("access_token"),G("refresh_token"),this.setState({access_token:null}))}},{key:"render",value:function(){return null!==F("access_token")?r.a.createElement(d.c,{history:z},r.a.createElement(d.d,null,r.a.createElement(d.a,{exact:!0,from:"/",to:"/maharashtra"}),r.a.createElement(d.b,{exact:!0,path:"/add-material",component:A}),r.a.createElement(d.b,{exact:!0,path:"/edit-material/:materialId",component:A}),r.a.createElement(d.b,{exact:!0,path:"/manage-materials",component:D}),r.a.createElement(d.b,{exact:!0,path:"/manage-material/:materialId",component:L}),r.a.createElement(d.b,{exact:!0,path:"/:state",component:T}),r.a.createElement(d.a,{path:"*",to:"/maharashtra"}))):r.a.createElement(d.c,{history:z},r.a.createElement(d.d,null,r.a.createElement(d.a,{exact:!0,from:"/",to:"/maharashtra"}),r.a.createElement(d.b,{exact:!0,path:"/login",component:N}),r.a.createElement(d.b,{exact:!0,path:"/:state",component:T}),r.a.createElement(d.a,{path:"*",to:"/maharashtra"})))}}]),a}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(200),a(201);s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(U,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),a(202).config()},25:function(e,t){function a(e,t,a){var n="";if(a){var r=new Date;r.setTime(r.getTime()+24*a*60*60*1e3),n="; expires="+r.toUTCString()}document.cookie=e+"="+t+n+"; path=/"}function n(e){for(var t=e+"=",a=document.cookie.split(";"),n=0;n<a.length;n++){for(var r=a[n];" "===r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(t))return r.substring(t.length,r.length)}return null}window.readCookie=n,t.readCookie=n,t.eraseCookie=function(e){a(e,"",-1)},t.createCookie=a}},[[127,1,2]]]);
//# sourceMappingURL=main.4a19a69e.chunk.js.map