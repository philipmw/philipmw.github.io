# source: http://tlattimore.com/blog/using-gravatar-in-jekyll/
# modifications by Philip.

require 'base64'
require 'digest/md5'

module Jekyll
  module GravatarFilter

    # Email address is base64-encoded to avoid spam spiders.
    def get_gravatar(base64_input)
      "//www.gravatar.com/avatar/#{hash(Base64.decode64(base64_input))}"
    end

    private :hash

    # Clean up the email address and return hashed version.
    def hash(email)
      email_address = email ? email.downcase.strip : ''
      Digest::MD5.hexdigest(email_address)
    end
  end
end

Liquid::Template.register_filter(Jekyll::GravatarFilter)