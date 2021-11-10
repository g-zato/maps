
function draw_maps(labels_clean, paths_clean, values_clean, pal) {
    var w = 1200,
        h = 800;
    var polygons_obj = {};
    var rows_obj = {};
    font_family = "Raleway, sans-serif";

    //sort data first
    var ranked_values = rank_maker(values_clean, (a, b) => b - a);
    var labels = sort_by_value(ranked_values, labels_clean);
    var qnt_value = sort_by_value(ranked_values, values_clean);
    var paths = sort_by_value(ranked_values, paths_clean);
    min_value = Math.min(...qnt_value);
    q25 = quantile(qnt_value, .25);
    q50 = quantile(qnt_value, .5);
    q75 = quantile(qnt_value, .75);
    q90 = quantile(qnt_value, .90);
    max_value = Math.max(...qnt_value);
    obj_class = class_finder(qnt_value.sort(function(a,b){return b-a}));
    obj_color = palette_finder(pal, obj_class);


    function sort_by_value(ranks, data) {
        result = [];
        previous_ranks = [];
        rank_aggregator = 0;
        for (i = 0; i < ranks.length; i++) {

            if (previous_ranks.includes(ranks[i])) {
                rank_aggregator = rank_aggregator + 1
            }
            previous_ranks[i] = ranks[i];

            result[ranks[i] - 1 + rank_aggregator] = data[i];

        }

        return (result);
    }


    function rank_maker(arr, f) {
        return arr
            .map((x, i) => [x, i])
            .sort((a, b) => f(a[0], b[0]))
            .reduce((a, x, i, s) => (a[x[1]] =
                i > 0 && f(s[i - 1][0], x[0]) === 0 ? a[s[i - 1][1]] : i + 1, a), []);
    }

    //quantile function to create classes
    function quantile(arr, q) {
        sorted = arr.sort((a, b) => a - b);
        //const sorted = arr;
        const pos = (sorted.length - 1) * q;
        const base = Math.floor(pos);
        const rest = pos - base;
        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    };

    function palette_finder(palette, classes) {
        result = [];

        for (i = 0; i < classes.length; i++) {
            value = classes[i];

            switch (true) {
                case (value == Math.round(min_value) + " - " + Math.round(q25)):
                    result[i] = palette[0];
                    break;
                case (value == Math.round(q25) + " - " + Math.round(q50)):
                    result[i] = palette[1];
                    break;
                case (value == Math.round(q50) + " - " + Math.round(q75)):
                    result[i] = palette[2];
                    break;
                case (value == Math.round(q75) + " - " + Math.round(q90)):
                        result[i] = palette[3];
                    break;
                default:
                    result[i] = palette[4];

            }
        }
        return (result)

    }

    function class_finder(values_data) {
        result = [];

        for (i = 0; i < values_data.length; i++) {
            value = values_data[i];

            switch (true) {
                case (value < q25):
                    result[i] = Math.round(min_value) + " - " + Math.round(q25);
                    break;
                case (value < q50):
                    result[i] = Math.round(q25) + " - " + Math.round(q50);
                    break;
                case (value < q75):
                    result[i] = Math.round(q50) + " - " + Math.round(q75);
                    break;
                case (value < q90):
                    result[i] = Math.round(q75) + " - " + Math.round(q90);
                    break;
                default:
                    result[i] = Math.round(q90) + " - " + Math.round(max_value);

            }
        }

        return (result)
    }

    //init raphael.js
    var plot_area = Raphael(document.getElementById('map_container'), w, h);
    plot_area.setViewBox(0, 0, w, h, true);
    plot_area.setSize('100%', '100%');

    //create reference to all polygons
    create_polygons_and_table("Rank,Região,Quantidade");
    for (let i = 0; i < labels.length; i++) {
        var obj_name = labels[i];
        create_hover_text(rows_obj[obj_name],
            polygons_obj[obj_name], obj_name, i);

        create_hover_polygon(rows_obj[obj_name],
            polygons_obj[obj_name], obj_name, i);
    };



    // draw polygons from path
    function create_polygons_and_table(column_names) {
        var y_table = 150,
            x_table = 700,
            height_table = 35,
            width_table = 140,
            qnt_value_aux = qnt_value.sort(function(a,b){return b-a});


        write_table_row("title", x_table, y_table, width_table, height_table,
            plot_area, column_names, true);
        y_table = y_table + height_table + 8;

        for (let i = 0; i < labels.length; i++) {
            polygons_obj[labels[i]] = plot_area.path(paths[i])
                .attr({ fill: obj_color[i], "stroke-width": 1, stroke:"#ffbfbf"})
                .translate(10, 250);
            
            write_table_row(labels[i], x_table, y_table, width_table, height_table,
                plot_area, (i + 1) + "º" + "," + labels[i] + "," + qnt_value_aux[i], false, obj_color[i]);
            y_table = y_table + height_table;
        }
    };

    function create_hover_text(label, polygon, name, index) {
        n_elements = label.length - 1;
        //maping others names

        var others_names = labels.
        filter(key => !name.includes(key));

        label[n_elements].mouseover(function() {
            polygon.animate({ "stroke-width": 2 }, 100);
            label[0].animate({ opacity: 1 }, 150);
            label[1].animate({ opacity: 1 }, 150);
            this.attr({ cursor: "pointer" });
            for (j = 2; j < n_elements; j++) {
                label[j].attr({ "font-weight": "bold", opacity: 1 })
            }

            // change others labels and paths
            for (j = 0; j < others_names.length; j++) {

                //polygons
                polygons_obj[others_names[j]].animate({ opacity: .2 }, 100);

                //text
                for (k = 2; k < n_elements; k++) {
                    rows_obj[others_names[j]][k].animate({ opacity: .2 }, 150);
                }

            }
        })

        label[n_elements].mouseout(function() {
            polygon.animate({ "stroke-width": 1 }, 100);
            label[0].animate({ opacity: 0 }, 150);
            label[1].animate({ opacity: 0 }, 150);
            for (j = 3; j < n_elements; j++) {
                label[j].attr({ "font-weight": "normal" })
            }

            // return others labels and paths
            for (j = 0; j < others_names.length; j++) {

                //polygons
                polygons_obj[others_names[j]].animate({ opacity: 1 }, 100);

                //text
                for (k = 2; k < n_elements; k++) {
                    rows_obj[others_names[j]][k].animate({ opacity: 1 }, 150);
                }
            }
        });

    };

    function create_hover_polygon(label, polygon, name, index) {

        n_elements = label.length - 1;

        //maping others names
        var others_names = labels.
        filter(key => !name.includes(key));
        
        

        polygon.mouseover(function() {
            label[0].animate({ opacity: 1 }, 150);
            label[1].animate({ opacity: 1 }, 150);
            this.animate({ "stroke-width": 2 }, 150);
            this.attr({ cursor: "pointer" });
            for (j = 2; j < n_elements; j++) {
                label[j].attr({ "font-weight": "bold", opacity: 1 })
            }
            
            // change others labels and paths
            for (j = 0; j < others_names.length; j++) {

                //polygons
                polygons_obj[others_names[j]].animate({ opacity: .2 }, 100);

                //text
                for (k = 2; k < n_elements; k++) {
                    rows_obj[others_names[j]][k].animate({ opacity: .2 }, 1);
                }

            }
        })

        polygon.mouseout(function() {
            label[0].animate({ opacity: 0 }, 150);
            label[1].animate({ opacity: 0 }, 150);
            this.animate({ "stroke-width": 1 }, 150);

            for (j = 3; j < n_elements; j++) {
                label[j].attr({ "font-weight": "normal" })
            }

            // return others labels and paths
            for (j = 0; j < others_names.length; j++) {

                //polygons
                polygons_obj[others_names[j]].animate({ opacity: 1 }, 100);

                //text
                for (k = 2; k < n_elements; k++) {
                    rows_obj[others_names[j]][k].animate({ opacity: 1 }, 1);
                }
            }
        });

    };


    function write_table_row(row_id, x, y, width, height, paper, rowdata, title, number_color) {
        var TD = rowdata.split(",");
        var row = paper.set();
        var default_color = "white";

        if (title) {
            paper.rect(x, y + height, width * TD.length, 1)
                .attr({ "stroke": default_color, "stroke-width": 1 });
            for (j = 0; j < TD.length; j++) {
                /*
                if (j = 0) {
                    anchor = "end"
                } else { anchor = "middle" }
                */

                paper.text(x + width / 2, y + height / 2, TD[j])
                    .attr({ "font-weight": "bold", "font-size": 24, "font-family": font_family, fill:default_color });
                x = x + width;
            }

        } else {
            row.push(

                line_up = paper.rect(x, y, width * TD.length, .7)
                .attr({
                    "stroke": "black",
                    "stroke-width": .7,
                    "opacity": 0
                }),
                line_bottom = paper.rect(x, y + height, width * TD.length, .7)
                .attr({
                    "stroke": "black",
                    "stroke-width": .7,
                    "opacity": 0
                }),

            );

            var x2 = x;
            var face = "bold";
            
            for (j = 0; j < TD.length; j++) {

                if (j > 0) {
                    face = "normal"
                }

                if(j == TD.length -1){
                    default_color = number_color;
                    paper.rect(x2 + .25*width, y + .1*height, width*.5,  height*.8,  5)
                        .attr({fill:default_color, stroke:"transparent"})
                }

                row.push(
                    text = paper.text(x2 + width / 2, y + height / 2, TD[j])
                    .attr({ "font-size": 20, "font-weight": face, "font-family": font_family, fill:"white"})
                );
                x2 = x2 + width;

            }

            row.push(selector = paper.rect(x, y, width * TD.length, height)
                .attr({
                    "stroke": "transparent",
                    "stroke-width": 0,
                    "opacity": 0,
                    "fill": "transparent"
                }).toFront())

            rows_obj[row_id] = row;

        }

    }


}