import{b as I}from"./init-d40afb2b.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();const h=o=>{const t=WA.player,n=document.createElement("option");n.value="Dr"+t.name,n.text="Dr"+t.name,n.setAttribute("data-id",t.playerId.toString()),o.insertBefore(n,o.firstChild)},v=o=>{const t=WA.state["room-state"];for(let n=0;n<t.doctors.length;n++){const r=t.doctors[n],e=document.createElement("option");e.value="Dr"+r.name,e.text="Dr"+r.name,e.setAttribute("data-id",r.id.toString()),o.insertBefore(e,o.firstChild)}},B=()=>{const o=WA.state["room-state"];for(let t in o)if(o.hasOwnProperty(t)&&o[t].doctor===null)return t;return null},E=o=>{var n;const t=WA.state["room-state"];for(let r in t)if(t.hasOwnProperty(r)&&t[r].doctor!==null&&t[r].patient===null&&((n=t[r].doctor)==null?void 0:n.id)===o)return t[r].coordinates;return""};WA.onInit().then(async()=>{const o=document.getElementById("nom"),t=document.getElementById("prenom"),n=document.getElementById("medecin"),r=document.getElementById("salle"),e=document.getElementById("message"),s=document.getElementById("appointment"),i=document.getElementById("submitButton"),A=document.getElementById("doctorSubmitButton"),p=document.getElementById("patientButton"),y=document.getElementById("doctorButton"),m=document.getElementById("patientForm"),u=document.getElementById("doctorForm");p&&y&&m&&u?(h(r),v(n),p.addEventListener("click",()=>{m.style.display="block",u.style.display="none"}),y.addEventListener("click",()=>{m.style.display="none",u.style.display="block"})):console.error("One or more elements not found."),i.addEventListener("click",async()=>{WA.player.state.informations={firstName:o.value,lastName:t.value,doctorName:n.value,message:e.value,appointment:s.value,id:WA.player.playerId};const a=WA.state["room-state"];WA.state.saveVariable("room-state",{...a,patients:[...a.patients,WA.player.state.informations]}).catch(d=>console.error("Something went wrong while saving variable waiting-room",d)),WA.controls.restorePlayerControls();const c=n.selectedIndex,f=n.options[c].getAttribute("data-id");if(f!==null){const d=E(parseInt(f));if(d!==""){const g=a[d].coordinates.split(",");WA.player.moveTo(parseInt(g[0].trim()),parseInt(g[1].trim()),10)}else WA.player.moveTo(457,191,10)}}),A.addEventListener("click",async()=>{const a=WA.state["room-state"],c=B();if(WA.state.saveVariable("room-state",{...a,doctors:[...a.patients,{name:WA.player.name,id:WA.player.playerId,room:c}]}).catch(l=>console.error("Something went wrong while saving variable waiting-room",l)),c!==null){const l=a[c].coordinates.split(",");WA.player.moveTo(parseInt(l[0].trim()),parseInt(l[1].trim()),10)}WA.controls.restorePlayerControls()})}).catch(o=>console.error(o));I().then(()=>{console.log("Scripting API Extra ready")}).catch(o=>console.error(o));