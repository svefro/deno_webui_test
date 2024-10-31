import os
import os.path
import pefile

print('Modifying generated executable subsystem...')
binary = pefile.PE(os.getcwd()+"\\deno_webui_test.exe", fast_load=True)
binary.OPTIONAL_HEADER.Subsystem = 2
binary.write(filename="deno_webui_test.mod.exe")
binary.close()

# os.remove("deno_test.exe")
# os.rename("deno_test.mod.exe", "deno_test.exe")