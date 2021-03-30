$(document).ready(function(){
	$('[data-toggle="tooltip"]').tooltip();
	actions = "<a class='add' title='Add' data-toggle='tooltip' " + 
	 "onclick=\"modifyEtudiant(" + false + " )\"> <i class='material-icons'></i></a>" + 
	"<a class='edit' title='Edit'  data-toggle='tooltip' > <i class='material-icons'></i></a>"+
	"<a class='delete' title='Delete' data-toggle='tooltip' onclick=\"deleteEtudiant(" + false + ")\"> "+ 
	"<i class='material-icons'></i> </a> ";
	// Append table with add row form on add new button click
    $(".add-new").click(function(){
		$(this).attr("disabled", "disabled");
		var index = $("table tbody tr:last-child").index();
        var row = '<tr>' +
            '<td><input type="text" class="form-control" name="nom" id="nom"></td>' +
            '<td><input type="text" class="form-control" name="prenom" id="prenom"></td>' +
            '<td><input type="text" class="form-control" name="phone" id="phone"></td>' +
			'<td><input type="text" class="form-control" name="adresse" id="adresse"></td>' +
			'<td>' + actions + '</td>' +
        '</tr>';
    	$("table").append(row);		
		$("table tbody tr").eq(index + 1).find(".add, .edit").toggle();
        $('[data-toggle="tooltip"]').tooltip();
    });
	// Add row on add button click
	$(document).on("click", ".add", function(){
		var empty = false;
		var input = $(this).parents("tr").find('input[type="text"]');
		values = [];
        input.each(function(){
			values.push($(this).val());
			if(!$(this).val()){
				$(this).addClass("error");
				empty = true;
			} else{
                $(this).removeClass("error");
            }
		});
		console.log('33', idE)
		if(!idE){
			if(!empty){
				$.post( "/ajouterE", {nom: values[0], prenom: values[1], phone: values[2], adresse: values[3]}, ( data ) => {
					location.reload();
				});
			}
		}else{
			if(!empty){
				$.post( "/modifierE", {idE, nom: values[0], prenom: values[1], phone: values[2], adresse: values[3]}, ( data ) => {
				});
				idE = undefined;
			}	
		}
		$(this).parents("tr").find(".error").first().focus();
		if(!empty){
			input.each(function(){
				$(this).parent("td").html($(this).val());
			});			
			$(this).parents("tr").find(".add, .edit").toggle();
			$(".add-new").removeAttr("disabled");
		}		
    });
	// Edit row on edit button click
	$(document).on("click", ".edit", function(){		
        $(this).parents("tr").find("td:not(:last-child)").each(function(){
			$(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
		});		
		$(this).parents("tr").find(".add, .edit").toggle();
		$(".add-new").attr("disabled", "disabled");
    });
	// Delete row on delete button click
	$(document).on("click", ".delete", function(){
        $(this).parents("tr").remove();
		$(".add-new").removeAttr("disabled");
    });
});
var idE;
function deleteEtudiant(idE){
	$.post( "/supprimerE", {idE}, ( data ) => {
		console.log(data);
	});	
}
function modifyEtudiant(id){
	idE = id;
}
