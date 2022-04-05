const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack')


module.exports = {
    mode: 'development', // LE INDICO EL MODO EXPLICITAMENTE
    watch: true,
    entry: './src/index.js', // el punto de entrada de mi aplicación
    output: { // Esta es la salida de mi bundle
        path: path.resolve(__dirname, 'public_html/js'),
        // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
        // para no tener conflictos entre Linux, Windows, etc
        filename: '[name].[contenthash].js', 
        // EL NOMBRE DEL ARCHIVO FINAL,
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    resolve: {
        extensions: ['.js'], // LOS ARCHIVOS QUE WEBPACK VA A LEER
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@templates': path.resolve(__dirname, 'src/templates'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@images': path.resolve(__dirname, 'src/assets/images')
        }
    },
    module: {
        // REGLAS PARA TRABAJAR CON WEBPACK
        rules : [
            {
                test: /\.m?js$/, // LEE LOS ARCHIVOS CON EXTENSION .JS,
                exclude: /node_modules/, // IGNORA LOS MODULOS DE LA CARPETA
                use: {
                    loader: 'babel-loader'
                }
            },
            {
            test: /\.css|.styl$/i,
            use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
            ],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
        },
        {
            test: /\.(woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    mimetype: "aplication/font-woff",
                    name: "[name].[ext]",
                    outputPath: "./assets/fonts/",
                    publicPath: "../assets/fonts/",
                    esModule: false,
                }
            }
        }
        ]
    },
    plugins: [
        // Aqui es donde agregamos las librerias que nos ayuda a transpilar el codigo de nuestro proyecto
        new HTMLWebpackPlugin({
            inject: true, // Inyecta el bundle a nuestro template html
            template: './public/index.html', // Va a tomar nuestro template
            filename: './index.html' // Lo va a poner dentro de nuesta carpeta dist con el nombre de index.html
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src", "assets/images"),
                    to: "assets/images"
                }
            ]
        }),
        new Dotenv()
    ],
    
}