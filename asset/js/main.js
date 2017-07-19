$(function(){
    var articleLits = {
        articles:[
            {
                id:1,
                image:"asset/images/image_1.png",
                title:"Article title goes here to introduce the content 1",
                content:"When you are old and grey and full of sleep\," +
                "And nodding by the fire，take down this book\," +
                " And slowly read,and dream of the soft lookYour eyes had once\," +
                "and of their shadows deep;How many loved your moments of glad grace"
            }, {
                id:2,
                image:"asset/images/image_2.jpg",
                title:"Article title goes here to introduce the content 2",
                content:"When you are old and grey and full of sleep\," +
                "And nodding by the fire，take down this book\," +
                " And slowly read,and dream of the soft lookYour eyes had once\," +
                "and of their shadows deep;How many loved your moments of glad grace"
            }, {
                id:3,
                image:"asset/images/image_3.jpg",
                title:"Article title goes here to introduce the content 3",
                content:"When you are old and grey and full of sleep\," +
                "And nodding by the fire，take down this book\," +
                " And slowly read,and dream of the soft lookYour eyes had once\," +
                "and of their shadows deep;How many loved your moments of glad grace"
            },
        ]
    };
    initData(articleLits);
    /**
     * init data
     * @param data
     */
    function initData(data){
        var tpl =$("#articleTpl").html();
        var template = Handlebars.compile(tpl);
        var html = template(data);
        $("#articleList").append(html);
    }


    /**
     * handler add article button click event
     */
    $(document).on('click','.addArticleBtn',function (e) {
        e.preventDefault();
        addArticle();
    });

    /**
     * handler edit article button click event
     */
    $(document).on('click','.editArticleBtn',function (e) {
        e.preventDefault();
        editArticle();
        var $this = $(this);
        var current = $this.parent(".article_single").find(".article_id").data("id");
//                console.log(current);
        var articles = articleLits["articles"];
        articles.forEach(function(data,index){
            if(current == data.id){
                var mId = data.id;
                var mImage = data.image;
                var mTitle = data.title;
                var mContent = data.content;
                $("#edit_id").val(mId);
                $("#edit_image").val(mImage);
                $("#edit_title").val(mTitle);
                $("#edit_content").val(mContent);
            }
        })
    });

    $(document).on('mouseover','.article',function (e) {
        e.preventDefault();
//                $(".editArticleBtn").show();
        var $this = $(this);
        $this.find('.editArticleBtn').show()
    });

    $(document).on('mouseleave','.article',function (e) {
        e.preventDefault();
//                $(".editArticleBtn").hide();
        var $this = $(this);
        $this.find('.editArticleBtn').hide()
    });

    /**
     * save data
     */
    $(document).on('click','.saveBtn',function (e) {
        e.preventDefault();
        saveData();
    });

    /**
     * update data
     */
    $(document).on('click','.updateBtn',function (e) {
        e.preventDefault();
        var $this = $(this);
        var mId = $this.parents(".modal-content").find(".edit_id").val()
//                console.log(mId)
        updateData(mId);
    });


    /**
     * open modal addArticle
     */
    function addArticle(){
        $(".addArticleModal").modal();
    }
    /**
     * open modal editArticle
     */
    function editArticle(){
        $(".editArticleModal").modal();
    }

    function closeModal(DOM){
        $("."+DOM).modal('hide')
    }

    /**
     * @description save new data to article lists
     *
     */
    function saveData(){
        var articles = articleLits["articles"];
        var l = articles.length;
        var nid = l +1;
        var image = $.trim($("#image").val());
        var title = $.trim($("#title").val());
        var content = $.trim($("#content").val());
        var dataObj = {id:nid,image:image,title:title,content:content}
        articles.push(dataObj);
        $.toast({
            heading: 'Success',
            icon: 'success',
            text:'Saved!',
            hideAfter: 1500
        });

        clearAddForm();
        closeModal("addArticleModal");
        $("#articleList").empty();
        initData(articleLits);

    }
    /**
     * @description update the data to article lists
     * @params id
     */
    function updateData(id){
        var articles = articleLits["articles"];
        var image = $.trim($("#edit_image").val());
        var title = $.trim($("#edit_title").val());
        var content = $.trim($("#edit_content").val());

        articles.forEach(function(data,index){
            if(id == data.id){
//                        console.log(data)
                data.image = image;
                data.title = title;
                data.content = content;
            }
        })

        $.toast({
            heading: 'Success',
            icon: 'success',
            text:'Updated!',
            hideAfter: 1500
        });

        clearUpdateForm();
        closeModal("editArticleModal");
        $("#articleList").empty();
        initData(articleLits);
    }

    /**
     * @description clear add form
     */
    function clearAddForm(){
        $("#image").val("");
        $("#title").val("");
        $("#content").val("");
    }
    /**
     * @description clear update form
     */
    function clearUpdateForm(){
        $("#edit_image").val("");
        $("#edit_title").val("");
        $("#edit_content").val("");
        $("#edit_id").val("");
    }

})