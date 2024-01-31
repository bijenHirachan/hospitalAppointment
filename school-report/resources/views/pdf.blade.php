<!doctype html>
<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Invoice</title>

    <style>
        h4 {
            margin: 0;
        }

        .w-full {
            width: 100%;
        }

        .w-half {
            width: 50%;

        }

        .w-half img {
            width: 100px;
        }

        .margin-top {
            margin-top: 1.25rem;
        }

        .footer {
            font-size: 0.875rem;
            padding: 1rem;
            background-color: rgb(241 245 249);
        }

        table {
            width: 100%;
            border-spacing: 0;
        }

        table.products {
            font-size: 0.875rem;
        }

        table.products tr {
            background-color: #1c1c1c;
        }

        table.products th {
            color: #ffffff;
            padding: 0.5rem;
            text-align: left;
        }

        table tr.items {
            background-color: rgb(241 245 249);
        }

        table tr.items td {
            padding: 0.5rem;
        }

        .total {
            text-align: right;
            margin-top: 1rem;
            font-size: 0.875rem;
        }

        .text-right {
            text-align: right
        }
    </style>
</head>

<body>
    <table class="w-full">
        <tr>
            <td class="w-half">
                @include('image')
            </td>
            <td class="w-half text-right">
                <h2>Standard {{ $student->standard->title }} {{ $student->standard->section }}</h2>
            </td>
        </tr>
    </table>

    <div class="margin-top">
        <table class="w-full">
            <tr>
                <td class="w-half">
                    <div>Name: {{ $student->name }}</div>
                    <div>DOB: {{ $student->dob }}</div>
                </td>
                <td class="w-half text-right">
                    <div>Teacher: {{ $teacher ?? 'N/A' }}</div>
                </td>

            </tr>
        </table>
    </div>

    <div class="margin-top">
        <table class="products">
            <tr>
                <th>Subject</th>
                <th>Score</th>
                <th>Result</th>
            </tr>
            @foreach ($student->scores as $score)
                <tr class="items">
                    <td>
                        {{ $score->subject->title }}
                    </td>
                    <td>
                        {{ $score->marks }}
                    </td>
                    <td>
                        {{ $score->marks >= 32 ? 'PASS' : 'FAIL' }}
                    </td>
                </tr>
            @endforeach
            <tr>
                <th></th>
                <th>{{ $total }} / {{ $grandTotal }}</th>
                <th>{{ $status }}</th>
            </tr>


        </table>
    </div>



    <div class="footer margin-top">
        <span>&copy; School Report</span>
        <span style="float: right;">{{ $status }} {{ $percentage }} %</span>
    </div>
</body>

</html>
