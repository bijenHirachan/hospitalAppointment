<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Document</title>
</head>
<body class="h-full bg-red-200">
    <nav class="bg-red-500 h-16 px-16 py-8 flex items-center justify-between">
        <div class="text-white font-bold text-lg">
            Logo
        </div>
        <ul class="flex items-center gap-2">
            <li class="text-sm font-semibold text-white">Home</li>
            <li class="text-sm font-semibold text-white">About</li>
            <li class="text-sm font-semibold text-white">Contact</li>
        </ul>
    </nav>

    <main class="px-16 py-8">
        <p class="text-white text-xl drop-shadow-xl"><?php echo "Hello world!"?></p>
    </main>
</body>
</html>

