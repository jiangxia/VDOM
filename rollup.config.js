import babel from 'rollup-plugin-babel';

export default {
    //input : 'src/vnode/node.js',
    input : 'src/main.js',
    output : {
        //file : 'dist/vnode/node.js',
        file : 'dist/main.js',
        format : 'cjs'
    },
    banner : "/* fed123.com */",
    plugins : [
        babel({
            'presets' : [[
                'env',
                {
                    modules : false
                }
            ]],
            "plugins" : [
                ["transform-react-jsx" , {
                    "pragma" : "vnode"
                }]
            ]
        })
    ]
}