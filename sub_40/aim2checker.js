         
           $( document ).ready(function () {
           $("#skiplinkstart").focus();
           if ($(".AIMMaatregelCheckerGo").length > 0)
    {
        $("#menuet_command_next").on("click", function (e) {        
            var myRadio = $("input[name='men_p_1__RouteCheck']");
            var checkedValue = myRadio.filter(":checked").val();
            if (checkedValue=="professional")
            {
                e.preventDefault()
                window.location.href = "https://www.aimonline.nl/maatregelchecker";
            }
        });
    }
           
           })
           