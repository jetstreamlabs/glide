<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Inertia\Inertia;

class IndexController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
      return Inertia::render('Welcome', [
        'canLogin' => true,
        'canRegister' => true,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
      ]);
    }
}
