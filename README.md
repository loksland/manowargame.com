# manowargame.com
GitHub Pages repo for website

### Jekyl

Jekyll Installation on Mac 10.14+

``` terminal
sudo gem install bundler
sudo gem install -n /usr/local/bin/ jekyll
```

Source: https://jekyllrb.com/docs/installation/macos/

**Upgrading from 2.x to 3.x**
https://jekyllrb.com/docs/upgrading/2-to-3/

**Further updates**

Install jekyll pagination plugin

```
gem install jekyll-paginate
```

Update `_config.yml`:

``` yml
plugins:
  - jekyll-paginate
paginate: 5
```

**Liquid changes**

Replace
``` html
{{site.data.hash.["css/theme.min.css"]}}
```
with
``` html
{{site.data.hash["css/theme.min.css"]}}
```

This will no longer work:
``` html
if !page.id
```

### Gem plugins

**Image Tag Plugin**

Jekyll Image Tag requires Jekyll >=1.0, Minimagick >=3.6, and Imagemagick.

``` terminal
brew install imagemagick
```
Source: https://www.sethvargo.com/install-imagemagick-on-osx-lion/

``` terminal
gem install mini_magick
```

!IMPORTANT
Also `_config.yml`:
``` terminal
# JEKYLL CONFIG
baseurl: ""
```

### Grunt

Build to local `_dist/` dir
``` terminal
grunt build
```

Build to GitHub
``` terminal
grunt dist
```
