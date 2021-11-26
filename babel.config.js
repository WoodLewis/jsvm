module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        targets: {
          browsers: "> 0.5%, ie >= 11"
        },
        "exclude": ["@babel/plugin-transform-typeof-symbol" ]
      }
       
    ]
    
  ]
}
