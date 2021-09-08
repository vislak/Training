const tag_dic =
 { "1": "Email",
    "2": "Documnet",
    "3" : "Attachment",
    "4" : "Another Tag" 
}


function enableopenDropDown(doc_id){
var checkList = document.getElementById('doc_id'+doc_id);

    const clickHandler= function(event) {
        
        
        
        
    }
    
    checkList.getElementsByClassName('anchor')[0].onclick = function(){
        event.stopPropagation();
        console.log(this);
        if (checkList.classList.contains('visible'))
        {
          // hide the drop down
          checkList.classList.remove('visible');
      
      
          // get selected ids for post call 
          // using the element on which click happen
      
          var selectedtag=[];
      
          var cl= this.parentElement.id;
          var dropdownid=cl;
          var selected_tag=document.querySelectorAll('#'+dropdownid+' .getvalue .list-content').forEach((tagel)=>{
            selectedtag.push(tagel.dataset.id);
            console.log(tagel.dataset.id);
          });
      
          // also create text string for selected element
          // and modify the defualt "Add Tag"
        
          let displaystring=[];
          selectedtag.forEach((id)=>{
            displaystring.push(tag_dic[id]);
          });
         
      
            let dp= displaystring.join(' | ')
            if(dp.length ==0)dp=" Add Tag ";
            document.querySelectorAll('#'+dropdownid +' .drop-down-htext')[0].innerHTML=dp;
          console.log(dp);
      
        }
      
          
        else{
          checkList.classList.add('visible');}
        
}

}

const generateMultiDropDown = function(doc_id,Drop_className="dropdown-check-list")
{

  var tagdata= [{"id":1,"text":"Email"},{"id":"2","text": "Documnet"},
  {"id":"3","text" : "Attachment"}];

  let dropdownclass= 'dropdown-check-list';
  let dropdownid= 'doc_id'+doc_id;
  let parent_div= document.createElement("div");
    parent_div.setAttribute("class",dropdownclass);
    parent_div.setAttribute("id",dropdownid);





  let anchor_div=document.createElement("div");
    anchor_div.setAttribute("class","anchor");

  let tag_icon= document.createElement("i");
    tag_icon.setAttribute("class","fas fa-tag");

    let dropdowntext=document.createElement("div");
      dropdowntext.setAttribute("class","drop-down-htext");
      dropdowntext.innerHTML="Add Tag";
      dropdowntext.style.display="inline";

  let pen_icon = document.createElement("i");
  pen_icon.setAttribute("class","fas fa-pen");

  anchor_div.append(tag_icon);
  anchor_div.append(dropdowntext);
  anchor_div.append(pen_icon);


  console.log(anchor_div.childNodes);
  console.log(anchor_div.outerHTML);


  var ulist = document.createElement("ul");
  ulist.setAttribute("class","items");
  
  tagdata.forEach((item)=>{

      let general_css_class = "list-item";
      let li_identifier_class = "li-id-"+item.id;
      let extraClass = "getvalue";

      let li_id ="doc"+doc_id+ "-tag-id-"+item.id;

      let li_outer_div = document.createElement("div");
      li_outer_div.classList.add(general_css_class,li_identifier_class,extraClass);
      li_outer_div.setAttribute("id",li_id);



      let li_icon_div= document.createElement("div");
      let iconStyleClass= "list-icon";
      let visibleClass= "list-Active";
      let checkBoxClass= "check";
      li_icon_div.classList.add(iconStyleClass,visibleClass,checkBoxClass);


      let checkIcon= document.createElement("i");
      checkIcon.setAttribute("class","fas fa-check");

      li_icon_div.append(checkIcon);

      let dataDiv= document.createElement("div");
      dataDiv.setAttribute("class","list-content");
      dataDiv.setAttribute("data-id",item.id);
      dataDiv.innerHTML=item.text;

      li_outer_div.append(li_icon_div);
      li_outer_div.append(dataDiv);

      ulist.append(li_outer_div);


  });
    parent_div.append(anchor_div);
    parent_div.append(ulist);

  console.log(parent_div.outerHTML);

  
  return parent_div;


}

const setdropdown = function(doc_id,tagids)
{
    let dropdownid='doc_id'+doc_id;
    //first select drop down with doc_id i.e droplist+doc_id

    // first make all li unactive none selected i.e reset
    
    document.querySelectorAll('#doc_id'+doc_id+' .list-icon').forEach(function( el){el.classList.remove('list-Active')});
    
    document.querySelectorAll('#doc_id'+doc_id+' .list-item').forEach(function( el){el.classList.remove('getvalue')});
    
    
    // then iterate over tag_ids and make li active 

    // make display string for drop down head if have some default selected 
    
    let  displaystring=[];
    tagids.forEach((el)=>{
      var targeticon='#doc_id'+doc_id+' .li-id-'+el+' .list-icon';
      var targetcolour='#doc_id'+doc_id+' .li-id-'+el;
      
      document.querySelector(targeticon).classList.toggle('list-Active');
      document.querySelector(targetcolour).classList.toggle('getvalue');

      displaystring.push(tag_dic[el]);


    });

    let dp= displaystring.join(' | ')
    if(dp.length==0)dp="Add Tag"
    document.querySelectorAll('#'+dropdownid +' .drop-down-htext')[0].innerHTML=dp;

}





var el=generateMultiDropDown(2);
$("#ok2").append(el);
setdropdown(2,[1]);
enableopenDropDown(2);


var newDrop=generateMultiDropDown(3);
$("#ok1").append(newDrop);
setdropdown(3,[2]);
enableopenDropDown(3);

const abc= function(e)
{
  //if this item contain class getvalue
// toggle this class and also toggle class of isActive
let uid= $(this).attr('id');
$('#'+uid).toggleClass('getvalue');
$('#'+uid + ' .list-icon').toggleClass('list-Active');
console.log("click source is --->"+uid);
}
$(".list-item").click(abc);