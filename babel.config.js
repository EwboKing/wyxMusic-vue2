module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    // [
    //   'import',
    //   {
    //     libraryName: 'vxe-table',
    //     libraryDirectory: 'es',
    //     styleLibraryName: 'styles'
    //   }
    // ],
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        libraryDirectory: 'es',
        style: true
      },
      'antd'
    ],
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      },
      'el'
    ]

  ]
}
