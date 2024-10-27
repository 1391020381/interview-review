{
  "targets": [
    {
      "target_name": "hello",
      "cflags!": [ "-fno-exceptions" ],
      "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [ "hello.cc" ],
      "include_dirs": ["<!(node -p "require('node-addon-api').include_dir")"],
    }
  ]
}
