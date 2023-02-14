import 'dart:convert';
import 'dart:io';

import 'package:shelf/shelf.dart';
import 'package:shelf/shelf_io.dart';
import 'package:shelf_router/shelf_router.dart';

// Configure routes.
final _router = Router()..get('/', _rootHandler);

String getHost() {
  var host = Platform.environment['HOST'];
  host ??= InternetAddress.anyIPv4.host;
  return host;
}

final host = getHost();

Response _rootHandler(Request req) {
  return Response.ok(jsonEncode({
    'message': 'Hello World from $host',
    'language': 'Dart',
    'framework': 'Shelf',
    'success': true,
  }));
}

void main(List<String> args) async {
  // Configure a pipeline that logs requests.
  final handler = Pipeline().addMiddleware(logRequests()).addHandler(_router);

  // For running in containers, we respect the PORT environment variable.
  final port = int.parse(Platform.environment['PORT'] ?? '8080');
  final server = await serve(handler, host, port);
  print('Server listening on port ${server.port}');
}
