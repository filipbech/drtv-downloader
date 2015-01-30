(function($) {
	$.ajax(jQuery('[data-resource]').eq(0).data('resource')).then(function(res) {
		var bestForDownload = res.Links.reduce(function(previous, current) {
			if (current.Target == "Download" && current.Bitrate > (previous.Bitrate || 0)) {
				return current;
			}
			return previous;
		},{});

		if(bestForDownload.Uri) {
			window.location.href=bestForDownload.Uri;
		} else {
			var hls = res.Links.filter(function(link) {
				return link.Target == "HLS"
			})[0];
			confirm('this is a stream file. Download with vlc->exporting wizard');
			window.location.href=hls.Uri;
		}
	});
})(jQuery);
