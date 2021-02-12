package main

import (
	"fmt"
	"os"
	"path/filepath"
	"text/template"
)

const templateFileName = "README.md.tmpl"

var t = template.Must(template.New(templateFileName).ParseFiles(templateFileName))

func createREADME(dirname string) error {
	path := fmt.Sprintf("%s/README.md", dirname)
	f, err := os.OpenFile(path, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0755)
	if err != nil {
		return err
	}
	defer f.Close()

	code := createBookmarklet(dirname)

	return t.Execute(f, map[string]string{
		"Name":   dirname,
		"Script": code,
	})
}

func createBookmarklet(name string) string {
	return fmt.Sprintf(
		`javascript:void((function(){var s = document.createElement("script");s.type = "text/javascript";s.src = "https://cdn.jsdelivr.net/gh/serizawa-jp/roamkit@main/bookmarklets/%s/%s.js";document.getElementsByTagName("head")[0].appendChild(s);})());`,
		name,
		name,
	)
}

func main() {
	os.Exit(runMain())
}

func runMain() int {
	var bookmarkletDirs []string

	if err := filepath.Walk(".", func(path string, info os.FileInfo, err error) error {
		if info.Name() == "." {
			return nil
		}

		if info.IsDir() {
			bookmarkletDirs = append(bookmarkletDirs, path)
		}

		return nil
	}); err != nil {
		return 1
	}

	for _, d := range bookmarkletDirs {
		if err := createREADME(d); err != nil {
			fmt.Fprintf(os.Stderr, "[ERROR] failed to create a README: %v\n", err)
			return 1
		}
	}

	return 0
}
